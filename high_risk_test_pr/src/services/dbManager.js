/**
 * Database Connection Manager
 * Handles database connections and pooling
 */

const mongoose = require('mongoose');

class DBManager {
  constructor(uri, options = {}) {
    this.uri = uri;
    this.options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 10,
      minPoolSize: 2,
      ...options
    };
    this.connection = null;
  }

  /**
   * Connect to database
   */
  async connect() {
    try {
      this.connection = await mongoose.connect(this.uri, this.options);
      console.log('Database connected successfully');
      return this.connection;
    } catch (error) {
      console.error('Database connection failed:', error.message);
      throw error;
    }
  }

  /**
   * Disconnect from database
   */
  async disconnect() {
    try {
      await mongoose.disconnect();
      console.log('Database disconnected');
    } catch (error) {
      console.error('Disconnect failed:', error);
      throw error;
    }
  }

  /**
   * Get connection status
   */
  isConnected() {
    return mongoose.connection.readyState === 1;
  }

  /**
   * Get connection stats
   */
  getStats() {
    return {
      state: mongoose.connection.readyState,
      host: mongoose.connection.host,
      db: mongoose.connection.db?.databaseName,
      collections: Object.keys(mongoose.connection.collections)
    };
  }
}

module.exports = DBManager;
