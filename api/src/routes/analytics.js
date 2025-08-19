const express = require('express');
const router = express.Router();
const logger = require('../utils/logger');
const { authenticateJWT, authenticateAPIKey } = require('../middleware/auth');
const { validateEventData } = require('../middleware/validation');

/**
 * POST /api/v1/events
 * Collect user events for analytics
 */
router.post('/', authenticateAPIKey, validateEventData, async (req, res) => {
  try {
    const {
      event_type,
      event_properties = {},
      page_url,
      user_agent,
      session_id,
      user_id
    } = req.body;

    // Get client IP
    const ip_address = req.ip || req.connection.remoteAddress;

    // Prepare event data
    const eventData = {
      event_type,
      event_properties,
      page_url,
      user_agent: user_agent || req.get('User-Agent'),
      ip_address,
      session_id,
      user_id: user_id || req.user?.id || null,
      created_at: new Date().toISOString()
    };

    // Insert event into database
    const { data, error } = await req.app.locals.supabase
      .from('user_events')
      .insert([eventData])
      .select()
      .single();

    if (error) {
      logger.error('Failed to insert user event', {
        error: error.message,
        eventData,
        userId: eventData.user_id
      });
      
      return res.status(500).json({
        success: false,
        error: 'Failed to save event'
      });
    }

    // Broadcast real-time update
    req.app.locals.sseManager.broadcast('event_created', {
      id: data.id,
      event_type: data.event_type,
      created_at: data.created_at,
      user_id: data.user_id,
      session_id: data.session_id
    });

    logger.info('User event collected', {
      eventId: data.id,
      eventType: data.event_type,
      userId: data.user_id,
      sessionId: data.session_id
    });

    res.status(201).json({
      success: true,
      event_id: data.id,
      timestamp: data.created_at
    });

  } catch (error) {
    logger.error('Error collecting user event', {
      error: error.message,
      stack: error.stack,
      body: req.body
    });

    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

/**
 * GET /api/v1/events
 * Retrieve user events with filtering
 */
router.get('/', authenticateJWT, async (req, res) => {
  try {
    const {
      user_id,
      event_type,
      session_id,
      start_date,
      end_date,
      limit = 100,
      offset = 0
    } = req.query;

    // Build query
    let query = req.app.locals.supabase
      .from('user_events')
      .select('*', { count: 'exact' });

    // Apply filters
    if (user_id) {
      query = query.eq('user_id', user_id);
    }

    if (event_type) {
      if (Array.isArray(event_type)) {
        query = query.in('event_type', event_type);
      } else {
        query = query.eq('event_type', event_type);
      }
    }

    if (session_id) {
      query = query.eq('session_id', session_id);
    }

    if (start_date) {
      query = query.gte('created_at', start_date);
    }

    if (end_date) {
      query = query.lte('created_at', end_date);
    }

    // Apply pagination
    query = query
      .order('created_at', { ascending: false })
      .range(parseInt(offset), parseInt(offset) + parseInt(limit) - 1);

    const { data, error, count } = await query;

    if (error) {
      logger.error('Failed to retrieve user events', {
        error: error.message,
        filters: req.query
      });
      
      return res.status(500).json({
        success: false,
        error: 'Failed to retrieve events'
      });
    }

    res.json({
      success: true,
      data,
      total_count: count,
      pagination: {
        limit: parseInt(limit),
        offset: parseInt(offset),
        has_more: count > parseInt(offset) + parseInt(limit)
      }
    });

  } catch (error) {
    logger.error('Error retrieving user events', {
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
 * GET /api/v1/events/:id
 * Retrieve specific event by ID
 */
router.get('/:id', authenticateJWT, async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await req.app.locals.supabase
      .from('user_events')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({
          success: false,
          error: 'Event not found'
        });
      }

      logger.error('Failed to retrieve user event', {
        error: error.message,
        eventId: id
      });
      
      return res.status(500).json({
        success: false,
        error: 'Failed to retrieve event'
      });
    }

    res.json({
      success: true,
      data
    });

  } catch (error) {
    logger.error('Error retrieving user event', {
      error: error.message,
      stack: error.stack,
      eventId: req.params.id
    });

    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

/**
 * DELETE /api/v1/events/:id
 * Delete specific event (admin only)
 */
router.delete('/:id', authenticateJWT, async (req, res) => {
  try {
    // Check if user has admin role
    if (!req.user.app_metadata?.role === 'admin') {
      return res.status(403).json({
        success: false,
        error: 'Admin access required'
      });
    }

    const { id } = req.params;

    const { error } = await req.app.locals.supabase
      .from('user_events')
      .delete()
      .eq('id', id);

    if (error) {
      logger.error('Failed to delete user event', {
        error: error.message,
        eventId: id,
        adminId: req.user.id
      });
      
      return res.status(500).json({
        success: false,
        error: 'Failed to delete event'
      });
    }

    logger.info('User event deleted', {
      eventId: id,
      adminId: req.user.id
    });

    res.json({
      success: true,
      message: 'Event deleted successfully'
    });

  } catch (error) {
    logger.error('Error deleting user event', {
      error: error.message,
      stack: error.stack,
      eventId: req.params.id,
      adminId: req.user?.id
    });

    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

module.exports = router;