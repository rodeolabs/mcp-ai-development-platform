const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const logger = require('./utils/logger');
const { createClient } = require('@supabase/supabase-js');
const SSEManager = require('./utils/sseManager');

// Import routes
const analyticsRoutes = require('./routes/analytics');
const metricsRoutes = require('./routes/metrics');
const sessionRoutes = require('./routes/sessions');
const streamRoutes = require('./routes/stream');

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY,
  {
    db: {
      poolSize: 10,
      maxIdleTime: 30000,
      maxLifetime: 3600000
    }
  }
);

// Initialize SSE Manager
const sseManager = new SSEManager();

// Make supabase and sseManager available to routes
app.locals.supabase = supabase;
app.locals.sseManager = sseManager;

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      connectSrc: ["'self'", "*.supabase.co"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"]
    }
  }
}));

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 1000, // requests per window
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: 'Too many requests from this IP, please try again later.'
  }
});

app.use(limiter);

// Compression middleware
app.use(compression());

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`, {
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    timestamp: new Date().toISOString()
  });
  next();
});

// Health check endpoint
app.get('/health', async (req, res) => {
  const healthCheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: new Date(),
    services: {
      database: 'unknown',
      memory: process.memoryUsage(),
      sseConnections: sseManager.getConnectionCount()
    }
  };

  try {
    // Check Supabase connection
    const { data, error } = await supabase
      .from('user_events')
      .select('count', { count: 'exact' })
      .limit(1);
    
    healthCheck.services.database = error ? 'unhealthy' : 'healthy';
    
    if (error) {
      logger.error('Database health check failed', { error: error.message });
    }

    res.status(200).json(healthCheck);
  } catch (error) {
    logger.error('Health check failed', { error: error.message });
    healthCheck.message = 'Error';
    healthCheck.services.database = 'unhealthy';
    res.status(503).json(healthCheck);
  }
});

// API routes
app.use('/api/v1/events', analyticsRoutes);
app.use('/api/v1/metrics', metricsRoutes);
app.use('/api/v1/sessions', sessionRoutes);
app.use('/api/v1/stream', streamRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error('Unhandled error', {
    error: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method
  });

  res.status(err.status || 500).json({
    success: false,
    error: process.env.NODE_ENV === 'production' 
      ? 'Internal server error' 
      : err.message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully');
  sseManager.closeAllConnections();
  process.exit(0);
});

process.on('SIGINT', () => {
  logger.info('SIGINT received, shutting down gracefully');
  sseManager.closeAllConnections();
  process.exit(0);
});

app.listen(PORT, () => {
  logger.info(`Analytics API server running on port ${PORT}`, {
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

module.exports = app;