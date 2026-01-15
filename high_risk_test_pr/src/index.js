/**
 * Application Entry Point
 * Server initialization and middleware setup
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const config = require('./config');
const { authMiddleware, rateLimit, corsMiddleware } = require('./middleware/authMiddleware');
const { errorHandler, asyncHandler } = require('./middleware/errorHandler');

const app = express();

// ============= Middleware =============

// Security headers
app.use(helmet());

// CORS
app.use(corsMiddleware({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true
}));

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser());

// Rate limiting
app.use(rateLimit(config.rateLimit.max, config.rateLimit.windowMs));

// ============= Routes =============

/**
 * Health check endpoint
 */
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

/**
 * API v1 routes
 */
app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/users', authMiddleware, require('./routes/users'));
app.use('/api/v1/data', authMiddleware, require('./routes/data'));
app.use('/api/v1/files', authMiddleware, require('./routes/files'));

// ============= Error Handling =============

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use(errorHandler);

// ============= Server Startup =============

const PORT = config.server.port;
const HOST = config.server.host;

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
  console.log(`Environment: ${config.server.env}`);
});

module.exports = app;
