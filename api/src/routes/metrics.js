const express = require('express');
const router = express.Router();
const logger = require('../utils/logger');
const { authenticateJWT } = require('../middleware/auth');
const NodeCache = require('node-cache');

// Cache for metrics (5 minute TTL)
const metricsCache = new NodeCache({ stdTTL: 300 });

/**
 * GET /api/v1/metrics
 * Retrieve aggregated metrics with filtering
 */
router.get('/', authenticateJWT, async (req, res) => {
  try {
    const {
      metric_name,
      metric_type,
      start_date,
      end_date,
      bucket_size = '1 hour',
      limit = 100,
      offset = 0
    } = req.query;

    // Create cache key
    const cacheKey = JSON.stringify({
      metric_name,
      metric_type,
      start_date,
      end_date,
      bucket_size,
      limit,
      offset
    });

    // Check cache first
    const cached = metricsCache.get(cacheKey);
    if (cached) {
      logger.debug('Returning cached metrics', { cacheKey });
      return res.json(cached);
    }

    // Build query
    let query = req.app.locals.supabase
      .from('dashboard_metrics')
      .select('*', { count: 'exact' });

    // Apply filters
    if (metric_name) {
      if (Array.isArray(metric_name)) {
        query = query.in('metric_name', metric_name);
      } else {
        query = query.eq('metric_name', metric_name);
      }
    }

    if (metric_type) {
      query = query.eq('metric_type', metric_type);
    }

    if (bucket_size) {
      query = query.eq('bucket_size', bucket_size);
    }

    if (start_date) {
      query = query.gte('time_bucket', start_date);
    }

    if (end_date) {
      query = query.lte('time_bucket', end_date);
    }

    // Apply pagination and ordering
    query = query
      .order('time_bucket', { ascending: false })
      .range(parseInt(offset), parseInt(offset) + parseInt(limit) - 1);

    const { data, error, count } = await query;

    if (error) {
      logger.error('Failed to retrieve metrics', {
        error: error.message,
        filters: req.query
      });
      
      return res.status(500).json({
        success: false,
        error: 'Failed to retrieve metrics'
      });
    }

    const response = {
      success: true,
      data,
      total_count: count,
      pagination: {
        limit: parseInt(limit),
        offset: parseInt(offset),
        has_more: count > parseInt(offset) + parseInt(limit)
      },
      metadata: {
        cached: false,
        query_time: new Date().toISOString()
      }
    };

    // Cache the response
    metricsCache.set(cacheKey, response);

    res.json(response);

  } catch (error) {
    logger.error('Error retrieving metrics', {
      error: error.message,
      stack: error.stack,
      query: req.query
    });

    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

/**
 * GET /api/v1/metrics/summary
 * Get dashboard summary statistics
 */
router.get('/summary', authenticateJWT, async (req, res) => {
  try {
    const { time_range = '24 hours' } = req.query;

    // Calculate time range
    const endTime = new Date();
    const startTime = new Date();
    
    switch (time_range) {
      case '1 hour':
        startTime.setHours(startTime.getHours() - 1);
        break;
      case '24 hours':
        startTime.setDate(startTime.getDate() - 1);
        break;
      case '7 days':
        startTime.setDate(startTime.getDate() - 7);
        break;
      case '30 days':
        startTime.setDate(startTime.getDate() - 30);
        break;
      default:
        startTime.setDate(startTime.getDate() - 1);
    }

    const cacheKey = `summary_${time_range}`;
    const cached = metricsCache.get(cacheKey);
    if (cached) {
      return res.json(cached);
    }

    // Get total events in time range
    const { data: totalEvents, error: eventsError } = await req.app.locals.supabase
      .from('user_events')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', startTime.toISOString())
      .lte('created_at', endTime.toISOString());

    if (eventsError) {
      throw eventsError;
    }

    // Get unique users in time range
    const { data: uniqueUsers, error: usersError } = await req.app.locals.supabase
      .from('user_events')
      .select('user_id', { count: 'exact' })
      .gte('created_at', startTime.toISOString())
      .lte('created_at', endTime.toISOString())
      .not('user_id', 'is', null);

    if (usersError) {
      throw usersError;
    }

    // Get top event types
    const { data: topEvents, error: topEventsError } = await req.app.locals.supabase
      .from('user_events')
      .select('event_type')
      .gte('created_at', startTime.toISOString())
      .lte('created_at', endTime.toISOString());

    if (topEventsError) {
      throw topEventsError;
    }

    // Process top event types
    const eventTypeCounts = {};
    topEvents.forEach(event => {
      eventTypeCounts[event.event_type] = (eventTypeCounts[event.event_type] || 0) + 1;
    });

    const topEventTypes = Object.entries(eventTypeCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([event_type, count]) => ({ event_type, count }));

    // Get active sessions
    const { data: activeSessions, error: sessionsError } = await req.app.locals.supabase
      .from('user_sessions')
      .select('*', { count: 'exact', head: true })
      .gte('session_start', startTime.toISOString())
      .is('session_end', null);

    if (sessionsError) {
      throw sessionsError;
    }

    // Calculate growth rate (compare with previous period)
    const previousStartTime = new Date(startTime);
    const timeDiff = endTime - startTime;
    previousStartTime.setTime(previousStartTime.getTime() - timeDiff);

    const { data: previousEvents, error: previousEventsError } = await req.app.locals.supabase
      .from('user_events')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', previousStartTime.toISOString())
      .lt('created_at', startTime.toISOString());

    if (previousEventsError) {
      throw previousEventsError;
    }

    const growthRate = previousEvents.length > 0 
      ? ((totalEvents.length - previousEvents.length) / previousEvents.length) * 100 
      : 0;

    const summary = {
      success: true,
      data: {
        time_range,
        period: {
          start: startTime.toISOString(),
          end: endTime.toISOString()
        },
        metrics: {
          total_events: totalEvents.length,
          unique_users: new Set(uniqueUsers?.map(u => u.user_id) || []).size,
          active_sessions: activeSessions.length,
          growth_rate: Math.round(growthRate * 100) / 100
        },
        top_event_types: topEventTypes,
        real_time_stats: {
          connections: req.app.locals.sseManager.getConnectionCount(),
          uptime: Math.round(process.uptime())
        }
      },
      metadata: {
        cached: false,
        generated_at: new Date().toISOString()
      }
    };

    // Cache for 2 minutes
    metricsCache.set(cacheKey, summary, 120);

    res.json(summary);

  } catch (error) {
    logger.error('Error generating metrics summary', {
      error: error.message,
      stack: error.stack,
      timeRange: req.query.time_range
    });

    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

/**
 * GET /api/v1/metrics/charts
 * Get data formatted for chart consumption
 */
router.get('/charts', authenticateJWT, async (req, res) => {
  try {
    const {
      chart_type = 'line',
      metric_name = 'page_views',
      bucket_size = '1 hour',
      start_date,
      end_date,
      limit = 100
    } = req.query;

    const cacheKey = `charts_${chart_type}_${metric_name}_${bucket_size}_${start_date}_${end_date}`;
    const cached = metricsCache.get(cacheKey);
    if (cached) {
      return res.json(cached);
    }

    // Set default time range if not provided
    const endTime = end_date ? new Date(end_date) : new Date();
    const startTime = start_date ? new Date(start_date) : new Date(endTime - 24 * 60 * 60 * 1000);

    // Get metrics data
    const { data: metrics, error } = await req.app.locals.supabase
      .from('dashboard_metrics')
      .select('*')
      .eq('metric_name', metric_name)
      .eq('bucket_size', bucket_size)
      .gte('time_bucket', startTime.toISOString())
      .lte('time_bucket', endTime.toISOString())
      .order('time_bucket', { ascending: true })
      .limit(parseInt(limit));

    if (error) {
      throw error;
    }

    // Format data for different chart types
    let chartData;
    
    switch (chart_type) {
      case 'line':
      case 'area':
        chartData = metrics.map(metric => ({
          timestamp: metric.time_bucket,
          value: metric.metric_value,
          metric_type: metric.metric_type,
          dimensions: metric.dimensions
        }));
        break;
        
      case 'bar':
        chartData = metrics.map(metric => ({
          category: new Date(metric.time_bucket).toLocaleDateString(),
          value: metric.metric_value,
          metric_type: metric.metric_type
        }));
        break;
        
      case 'pie':
        // Aggregate by dimensions or metric type
        const aggregated = {};
        metrics.forEach(metric => {
          const key = metric.dimensions?.category || metric.metric_type || 'unknown';
          aggregated[key] = (aggregated[key] || 0) + metric.metric_value;
        });
        
        chartData = Object.entries(aggregated).map(([name, value]) => ({
          name,
          value
        }));
        break;
        
      default:
        chartData = metrics;
    }

    const response = {
      success: true,
      data: chartData,
      metadata: {
        chart_type,
        metric_name,
        bucket_size,
        period: {
          start: startTime.toISOString(),
          end: endTime.toISOString()
        },
        data_points: chartData.length,
        cached: false
      }
    };

    // Cache for 2 minutes
    metricsCache.set(cacheKey, response, 120);

    res.json(response);

  } catch (error) {
    logger.error('Error generating chart data', {
      error: error.message,
      stack: error.stack,
      query: req.query
    });

    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

/**
 * POST /api/v1/metrics/refresh
 * Force refresh cached metrics
 */
router.post('/refresh', authenticateJWT, async (req, res) => {
  try {
    // Check if user has admin role
    if (!req.user.app_metadata?.role === 'admin') {
      return res.status(403).json({
        success: false,
        error: 'Admin access required'
      });
    }

    // Clear all cached metrics
    metricsCache.flushAll();

    logger.info('Metrics cache cleared', {
      adminId: req.user.id,
      timestamp: new Date().toISOString()
    });

    res.json({
      success: true,
      message: 'Metrics cache refreshed successfully'
    });

  } catch (error) {
    logger.error('Error refreshing metrics cache', {
      error: error.message,
      stack: error.stack,
      adminId: req.user?.id
    });

    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

module.exports = router;