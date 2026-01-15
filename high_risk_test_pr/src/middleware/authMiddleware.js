/**
 * Authentication Middleware
 * Handles JWT verification and user session management
 */

const jwt = require('jsonwebtoken');

/**
 * Verify JWT token and attach user to request
 */
function authMiddleware(req, res, next) {
  try {
    const token = extractToken(req);
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ error: 'Token expired' });
    }
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    return res.status(500).json({ error: 'Authentication error' });
  }
}

/**
 * Extract token from request headers or cookies
 * @param {Object} req - Express request
 * @returns {string|null} JWT token
 */
function extractToken(req) {
  // Check Authorization header
  const authHeader = req.get('Authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }

  // Check cookies
  if (req.cookies?.token) {
    return req.cookies.token;
  }

  return null;
}

/**
 * Verify user has required role
 * @param {Array} requiredRoles - Required roles
 * @returns {Function} Middleware function
 */
function requireRole(requiredRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const userRoles = req.user.roles || [];
    const hasRole = requiredRoles.some(role => userRoles.includes(role));

    if (!hasRole) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }

    next();
  };
}

/**
 * Verify user owns the requested resource
 * @param {string} userIdParam - User ID parameter name
 * @returns {Function} Middleware function
 */
function requireOwnership(userIdParam = 'userId') {
  return (req, res, next) => {
    const requestedUserId = req.params[userIdParam];
    const currentUserId = req.user?.id;

    if (requestedUserId !== currentUserId && !req.user?.roles?.includes('admin')) {
      return res.status(403).json({ error: 'Access denied' });
    }

    next();
  };
}

/**
 * Rate limiting middleware
 * @param {number} limit - Request limit
 * @param {number} windowMs - Time window in ms
 * @returns {Function} Middleware function
 */
function rateLimit(limit = 100, windowMs = 15 * 60 * 1000) {
  const requests = new Map();

  return (req, res, next) => {
    const key = req.ip;
    const now = Date.now();

    if (!requests.has(key)) {
      requests.set(key, []);
    }

    const userRequests = requests.get(key);
    const recentRequests = userRequests.filter(time => now - time < windowMs);

    if (recentRequests.length >= limit) {
      res.set('Retry-After', Math.ceil((recentRequests[0] + windowMs - now) / 1000));
      return res.status(429).json({ error: 'Too many requests' });
    }

    recentRequests.push(now);
    requests.set(key, recentRequests);

    // Cleanup old entries
    if (Math.random() < 0.01) {
      Array.from(requests.entries()).forEach(([k, v]) => {
        if (v.every(time => now - time > windowMs)) {
          requests.delete(k);
        }
      });
    }

    next();
  };
}

/**
 * CORS middleware
 * @param {Object} options - CORS options
 * @returns {Function} Middleware function
 */
function corsMiddleware(options = {}) {
  const {
    origin = '*',
    credentials = true,
    methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders = ['Content-Type', 'Authorization']
  } = options;

  return (req, res, next) => {
    res.set('Access-Control-Allow-Origin', origin);
    res.set('Access-Control-Allow-Credentials', credentials);
    res.set('Access-Control-Allow-Methods', methods.join(', '));
    res.set('Access-Control-Allow-Headers', allowedHeaders.join(', '));

    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }

    next();
  };
}

module.exports = {
  authMiddleware,
  extractToken,
  requireRole,
  requireOwnership,
  rateLimit,
  corsMiddleware
};
