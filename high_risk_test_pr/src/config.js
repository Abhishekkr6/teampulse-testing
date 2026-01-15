/**
 * Configuration Management
 * Centralized application configuration
 */

module.exports = {
  // Server Configuration
  server: {
    port: process.env.PORT || 3000,
    host: process.env.HOST || 'localhost',
    env: process.env.NODE_ENV || 'development'
  },

  // Database Configuration
  database: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/app',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  },

  // JWT Configuration
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key',
    expiresIn: '24h',
    refreshExpiresIn: '7d'
  },

  // API Configuration
  api: {
    baseURL: process.env.API_BASE_URL || 'http://localhost:3000/api',
    timeout: 30000,
    retries: 3
  },

  // File Upload Configuration
  uploads: {
    maxSize: 5 * 1024 * 1024, // 5MB
    uploadDir: './uploads',
    allowedMimes: ['image/jpeg', 'image/png', 'application/pdf']
  },

  // Email Configuration
  email: {
    provider: process.env.EMAIL_PROVIDER || 'nodemailer',
    from: process.env.EMAIL_FROM || 'noreply@example.com',
    smtp: {
      host: process.env.SMTP_HOST || 'smtp.example.com',
      port: process.env.SMTP_PORT || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    }
  },

  // Redis Configuration
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
    db: process.env.REDIS_DB || 0
  },

  // Logging Configuration
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    format: 'json',
    directory: './logs'
  },

  // Rate Limiting
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // requests per window
  }
};
