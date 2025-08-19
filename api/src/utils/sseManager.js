const logger = require('./logger');
const crypto = require('crypto');

class SSEManager {
  constructor() {
    this.connections = new Map(); // connectionId -> connection object
    this.userConnections = new Map(); // userId -> Set of connectionIds
    this.subscriptions = new Map(); // subscriptionId -> filters
    
    // Cleanup inactive connections every 5 minutes
    this.cleanupInterval = setInterval(() => {
      this.cleanupInactiveConnections();
    }, 5 * 60 * 1000);
  }

  /**
   * Add a new SSE connection
   * @param {string} userId - User ID
   * @param {Response} response - Express response object
   * @param {Object} filters - Subscription filters
   * @returns {string} connectionId
   */
  addConnection(userId, response, filters = {}) {
    const connectionId = crypto.randomUUID();
    
    const connection = {
      id: connectionId,
      userId,
      response,
      filters,
      lastPing: Date.now(),
      connected: true
    };

    this.connections.set(connectionId, connection);
    
    // Track user connections
    if (!this.userConnections.has(userId)) {
      this.userConnections.set(userId, new Set());
    }
    this.userConnections.get(userId).add(connectionId);

    // Set up connection event handlers
    response.on('close', () => {
      this.removeConnection(connectionId);
    });

    response.on('error', (error) => {
      logger.error('SSE connection error', {
        connectionId,
        userId,
        error: error.message
      });
      this.removeConnection(connectionId);
    });

    logger.info('SSE connection established', {
      connectionId,
      userId,
      totalConnections: this.connections.size,
      filters
    });

    return connectionId;
  }

  /**
   * Remove an SSE connection
   * @param {string} connectionId 
   */
  removeConnection(connectionId) {
    const connection = this.connections.get(connectionId);
    if (!connection) return;

    const { userId } = connection;

    // Remove from connections map
    this.connections.delete(connectionId);

    // Remove from user connections
    if (this.userConnections.has(userId)) {
      this.userConnections.get(userId).delete(connectionId);
      if (this.userConnections.get(userId).size === 0) {
        this.userConnections.delete(userId);
      }
    }

    logger.info('SSE connection removed', {
      connectionId,
      userId,
      totalConnections: this.connections.size
    });
  }

  /**
   * Broadcast event to filtered connections
   * @param {string} eventType - Event type
   * @param {Object} data - Event data
   * @param {Object} filters - Optional filters to match connections
   */
  broadcast(eventType, data, filters = {}) {
    const targetConnections = Array.from(this.connections.values())
      .filter(connection => connection.connected && this.matchesFilters(data, connection.filters, filters));

    logger.debug('Broadcasting SSE event', {
      eventType,
      targetConnections: targetConnections.length,
      totalConnections: this.connections.size
    });

    targetConnections.forEach(connection => {
      this.sendEvent(connection, eventType, data);
    });

    return targetConnections.length;
  }

  /**
   * Broadcast to specific user
   * @param {string} userId - Target user ID
   * @param {string} eventType - Event type
   * @param {Object} data - Event data
   */
  broadcastToUser(userId, eventType, data) {
    const userConnectionIds = this.userConnections.get(userId);
    if (!userConnectionIds) return 0;

    let sentCount = 0;
    userConnectionIds.forEach(connectionId => {
      const connection = this.connections.get(connectionId);
      if (connection && connection.connected) {
        this.sendEvent(connection, eventType, data);
        sentCount++;
      }
    });

    return sentCount;
  }

  /**
   * Send SSE event to specific connection
   * @param {Object} connection - Connection object
   * @param {string} eventType - Event type
   * @param {Object} data - Event data
   */
  sendEvent(connection, eventType, data) {
    try {
      const { response, id: connectionId } = connection;
      
      // Update last ping
      connection.lastPing = Date.now();
      
      // Format SSE message
      const eventData = JSON.stringify(data);
      response.write(`event: ${eventType}\n`);
      response.write(`data: ${eventData}\n\n`);
      
      logger.debug('SSE event sent', {
        connectionId,
        eventType,
        dataSize: eventData.length
      });
    } catch (error) {
      logger.error('Failed to send SSE event', {
        connectionId: connection.id,
        eventType,
        error: error.message
      });
      this.removeConnection(connection.id);
    }
  }

  /**
   * Check if data matches connection filters
   * @param {Object} data - Event data
   * @param {Object} connectionFilters - Connection-specific filters
   * @param {Object} broadcastFilters - Broadcast-specific filters
   * @returns {boolean}
   */
  matchesFilters(data, connectionFilters = {}, broadcastFilters = {}) {
    // Combine both filter sets
    const allFilters = { ...connectionFilters, ...broadcastFilters };
    
    // If no filters, allow all
    if (Object.keys(allFilters).length === 0) return true;

    // Check each filter
    for (const [key, value] of Object.entries(allFilters)) {
      if (Array.isArray(value)) {
        // Array filter - data value must be in array
        if (!value.includes(data[key])) return false;
      } else {
        // Exact match filter
        if (data[key] !== value) return false;
      }
    }

    return true;
  }

  /**
   * Send ping to keep connections alive
   */
  sendKeepAlive() {
    const activeConnections = Array.from(this.connections.values())
      .filter(connection => connection.connected);

    activeConnections.forEach(connection => {
      this.sendEvent(connection, 'ping', { timestamp: Date.now() });
    });

    logger.debug('Keep-alive ping sent', {
      connections: activeConnections.length
    });

    return activeConnections.length;
  }

  /**
   * Clean up inactive connections
   */
  cleanupInactiveConnections() {
    const now = Date.now();
    const timeout = 5 * 60 * 1000; // 5 minutes
    
    const inactiveConnections = Array.from(this.connections.values())
      .filter(connection => now - connection.lastPing > timeout);

    inactiveConnections.forEach(connection => {
      logger.info('Removing inactive SSE connection', {
        connectionId: connection.id,
        userId: connection.userId,
        lastPing: new Date(connection.lastPing)
      });
      this.removeConnection(connection.id);
    });

    if (inactiveConnections.length > 0) {
      logger.info('Cleaned up inactive connections', {
        removed: inactiveConnections.length,
        remaining: this.connections.size
      });
    }
  }

  /**
   * Close all connections
   */
  closeAllConnections() {
    logger.info('Closing all SSE connections', {
      totalConnections: this.connections.size
    });

    this.connections.forEach(connection => {
      try {
        connection.response.end();
      } catch (error) {
        logger.error('Error closing SSE connection', {
          connectionId: connection.id,
          error: error.message
        });
      }
    });

    this.connections.clear();
    this.userConnections.clear();
    this.subscriptions.clear();

    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }
  }

  /**
   * Get connection statistics
   */
  getStats() {
    return {
      totalConnections: this.connections.size,
      uniqueUsers: this.userConnections.size,
      uptime: process.uptime()
    };
  }

  /**
   * Get connection count
   */
  getConnectionCount() {
    return this.connections.size;
  }
}

module.exports = SSEManager;