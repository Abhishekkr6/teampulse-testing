/**
 * Logger Service
 * Centralized logging with different severity levels
 */

const fs = require('fs');
const path = require('path');

class Logger {
  constructor(logDir = './logs') {
    this.logDir = logDir;
    this.ensureLogDirectory();
  }

  /**
   * Ensure log directory exists
   */
  ensureLogDirectory() {
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
  }

  /**
   * Write log entry
   * @param {string} level - Log level
   * @param {string} message - Log message
   * @param {Object} metadata - Additional metadata
   */
  log(level, message, metadata = {}) {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      level,
      message,
      ...metadata
    };

    const logFile = path.join(this.logDir, `${level.toLowerCase()}.log`);
    const logLine = JSON.stringify(logEntry) + '\n';

    fs.appendFileSync(logFile, logLine);
    
    if (level === 'ERROR') {
      console.error(`[${timestamp}] ${level}: ${message}`, metadata);
    } else {
      console.log(`[${timestamp}] ${level}: ${message}`);
    }
  }

  info(message, metadata) { this.log('INFO', message, metadata); }
  warn(message, metadata) { this.log('WARN', message, metadata); }
  error(message, metadata) { this.log('ERROR', message, metadata); }
  debug(message, metadata) { this.log('DEBUG', message, metadata); }

  /**
   * Get logs filtered by criteria
   * @param {Object} filters - Filter criteria
   * @returns {Array} Filtered logs
   */
  getLogs(filters = {}) {
    const { level = 'INFO', limit = 100, days = 1 } = filters;
    const logFile = path.join(this.logDir, `${level.toLowerCase()}.log`);
    
    if (!fs.existsSync(logFile)) {
      return [];
    }

    const cutoffTime = Date.now() - (days * 24 * 60 * 60 * 1000);
    return fs.readFileSync(logFile, 'utf8')
      .split('\n')
      .filter(line => line.trim())
      .map(line => JSON.parse(line))
      .filter(entry => new Date(entry.timestamp).getTime() > cutoffTime)
      .slice(-limit);
  }
}

module.exports = new Logger();
