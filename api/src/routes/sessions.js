const express = require('express');
const router = express.Router();
const logger = require('../utils/logger');
const { authenticateOptional } = require('../middleware/auth');
const { validateSessionData } = require('../middleware/validation');

/**
 * POST /api/v1/sessions/start
 * Initialize a user session
 */
router.post('/start', authenticateOptional, validateSessionData, async (req, res) => {
  try {
    const {
      user_id,
      device_type,
      browser,
      page_url
    } = req.body;

    // Get client info
    const user_agent = req.get('User-Agent');
    const ip_address = req.ip || req.connection.remoteAddress;

    // Create session data
    const sessionData = {
      user_id: user_id || req.user?.id || null,
      device_type: device_type || detectDeviceType(user_agent),
      browser: browser || detectBrowser(user_agent),
      session_start: new Date().toISOString(),
      page_views: 1,
      total_time_seconds: 0,
      created_at: new Date().toISOString()
    };

    // Insert session into database
    const { data, error } = await req.app.locals.supabase
      .from('user_sessions')
      .insert([sessionData])
      .select()
      .single();

    if (error) {
      logger.error('Failed to create user session', {
        error: error.message,
        sessionData
      });
      
      return res.status(500).json({
        success: false,
        error: 'Failed to create session'
      });
    }

    // Track session start event
    if (page_url) {
      await req.app.locals.supabase
        .from('user_events')
        .insert([{
          user_id: data.user_id,
          event_type: 'session_start',
          event_properties: {
            device_type: data.device_type,
            browser: data.browser
          },
          page_url,
          user_agent,
          ip_address,
          session_id: data.id,
          created_at: new Date().toISOString()
        }]);
    }

    logger.info('User session started', {
      sessionId: data.id,
      userId: data.user_id,
      deviceType: data.device_type,
      browser: data.browser
    });

    res.status(201).json({
      success: true,
      session_id: data.id,
      session_start: data.session_start,
      user_id: data.user_id
    });

  } catch (error) {
    logger.error('Error starting user session', {
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
 * PUT /api/v1/sessions/:session_id/end
 * End a user session
 */
router.put('/:session_id/end', authenticateOptional, async (req, res) => {
  try {
    const { session_id } = req.params;
    const { total_time_seconds, page_views } = req.body;

    // Get current session
    const { data: session, error: sessionError } = await req.app.locals.supabase
      .from('user_sessions')
      .select('*')
      .eq('id', session_id)
      .single();

    if (sessionError) {
      if (sessionError.code === 'PGRST116') {
        return res.status(404).json({
          success: false,
          error: 'Session not found'
        });
      }
      throw sessionError;
    }

    // Calculate session duration if not provided
    const sessionEnd = new Date();
    const sessionStart = new Date(session.session_start);
    const calculatedDuration = Math.floor((sessionEnd - sessionStart) / 1000);

    // Update session
    const { data, error } = await req.app.locals.supabase
      .from('user_sessions')
      .update({
        session_end: sessionEnd.toISOString(),
        total_time_seconds: total_time_seconds || calculatedDuration,
        page_views: page_views || session.page_views,
        updated_at: new Date().toISOString()
      })
      .eq('id', session_id)
      .select()
      .single();

    if (error) {
      logger.error('Failed to end user session', {
        error: error.message,
        sessionId: session_id
      });
      
      return res.status(500).json({
        success: false,
        error: 'Failed to end session'
      });
    }

    // Track session end event
    await req.app.locals.supabase
      .from('user_events')
      .insert([{
        user_id: data.user_id,
        event_type: 'session_end',
        event_properties: {
          session_duration: data.total_time_seconds,
          page_views: data.page_views,
          device_type: data.device_type,
          browser: data.browser
        },
        session_id: data.id,
        created_at: new Date().toISOString()
      }]);

    logger.info('User session ended', {
      sessionId: data.id,
      userId: data.user_id,
      duration: data.total_time_seconds,
      pageViews: data.page_views
    });

    res.json({
      success: true,
      session_summary: {
        session_id: data.id,
        user_id: data.user_id,
        duration_seconds: data.total_time_seconds,
        page_views: data.page_views,
        session_start: data.session_start,
        session_end: data.session_end
      }
    });

  } catch (error) {
    logger.error('Error ending user session', {
      error: error.message,
      stack: error.stack,
      sessionId: req.params.session_id
    });

    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

/**
 * PUT /api/v1/sessions/:session_id/ping
 * Update session activity (keep alive)
 */
router.put('/:session_id/ping', authenticateOptional, async (req, res) => {
  try {
    const { session_id } = req.params;
    const { page_url, page_views_increment = 1 } = req.body;

    // Update session last activity
    const { data, error } = await req.app.locals.supabase
      .from('user_sessions')
      .update({
        page_views: req.app.locals.supabase.rpc('increment_page_views', {
          session_id,
          increment: page_views_increment
        }),
        updated_at: new Date().toISOString()
      })
      .eq('id', session_id)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({
          success: false,
          error: 'Session not found'
        });
      }
      
      logger.error('Failed to ping user session', {
        error: error.message,
        sessionId: session_id
      });
      
      return res.status(500).json({
        success: false,
        error: 'Failed to update session'
      });
    }

    // Track page view event if URL provided
    if (page_url) {
      await req.app.locals.supabase
        .from('user_events')
        .insert([{
          user_id: data.user_id,
          event_type: 'page_view',
          event_properties: {
            page_views_total: data.page_views
          },
          page_url,
          session_id: data.id,
          created_at: new Date().toISOString()
        }]);
    }

    res.json({
      success: true,
      session_id: data.id,
      page_views: data.page_views,
      last_activity: data.updated_at
    });

  } catch (error) {
    logger.error('Error pinging user session', {
      error: error.message,
      stack: error.stack,
      sessionId: req.params.session_id
    });

    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

/**
 * GET /api/v1/sessions/:session_id
 * Get session details
 */
router.get('/:session_id', authenticateOptional, async (req, res) => {
  try {
    const { session_id } = req.params;

    const { data, error } = await req.app.locals.supabase
      .from('user_sessions')
      .select('*')
      .eq('id', session_id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({
          success: false,
          error: 'Session not found'
        });
      }
      throw error;
    }

    // Calculate current session duration if still active
    let currentDuration = data.total_time_seconds;
    if (!data.session_end) {
      const now = new Date();
      const start = new Date(data.session_start);
      currentDuration = Math.floor((now - start) / 1000);
    }

    res.json({
      success: true,
      data: {
        ...data,
        current_duration_seconds: currentDuration,
        is_active: !data.session_end
      }
    });

  } catch (error) {
    logger.error('Error retrieving user session', {
      error: error.message,
      stack: error.stack,
      sessionId: req.params.session_id
    });

    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

/**
 * GET /api/v1/sessions/user/:user_id
 * Get sessions for a specific user
 */
router.get('/user/:user_id', authenticateOptional, async (req, res) => {
  try {
    const { user_id } = req.params;
    const { limit = 50, offset = 0, active_only = false } = req.query;

    let query = req.app.locals.supabase
      .from('user_sessions')
      .select('*', { count: 'exact' })
      .eq('user_id', user_id);

    if (active_only === 'true') {
      query = query.is('session_end', null);
    }

    query = query
      .order('session_start', { ascending: false })
      .range(parseInt(offset), parseInt(offset) + parseInt(limit) - 1);

    const { data, error, count } = await query;

    if (error) {
      logger.error('Failed to retrieve user sessions', {
        error: error.message,
        userId: user_id
      });
      
      return res.status(500).json({
        success: false,
        error: 'Failed to retrieve sessions'
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
    logger.error('Error retrieving user sessions', {
      error: error.message,
      stack: error.stack,
      userId: req.params.user_id
    });

    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Utility functions
function detectDeviceType(userAgent) {
  if (!userAgent) return 'unknown';
  
  userAgent = userAgent.toLowerCase();
  
  if (userAgent.includes('mobile') || userAgent.includes('android') || userAgent.includes('iphone')) {
    return 'mobile';
  } else if (userAgent.includes('tablet') || userAgent.includes('ipad')) {
    return 'tablet';
  } else {
    return 'desktop';
  }
}

function detectBrowser(userAgent) {
  if (!userAgent) return 'unknown';
  
  userAgent = userAgent.toLowerCase();
  
  if (userAgent.includes('chrome')) return 'chrome';
  if (userAgent.includes('firefox')) return 'firefox';
  if (userAgent.includes('safari')) return 'safari';
  if (userAgent.includes('edge')) return 'edge';
  if (userAgent.includes('opera')) return 'opera';
  
  return 'other';
}

module.exports = router;