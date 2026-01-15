/**
 * API Client Service
 * Centralized HTTP client for backend API communication
 */

const axios = require('axios');
const https = require('https');

class APIClient {
  constructor(baseURL, apiKey = null) {
    this.baseURL = baseURL;
    this.apiKey = apiKey;
    this.client = axios.create({
      baseURL,
      timeout: 30000,
      httpsAgent: new https.Agent({
        rejectUnauthorized: process.env.NODE_ENV === 'production'
      })
    });

    this.setupInterceptors();
  }

  /**
   * Setup request/response interceptors
   */
  setupInterceptors() {
    this.client.interceptors.request.use(config => {
      if (this.apiKey) {
        config.headers['Authorization'] = `Bearer ${this.apiKey}`;
      }
      config.headers['User-Agent'] = 'APIClient/1.0';
      return config;
    });

    this.client.interceptors.response.use(
      response => response,
      error => {
        console.error('API Error:', {
          status: error.response?.status,
          message: error.message,
          url: error.config?.url
        });
        return Promise.reject(error);
      }
    );
  }

  /**
   * GET request
   * @param {string} endpoint - API endpoint
   * @param {Object} params - Query parameters
   * @returns {Promise}
   */
  async get(endpoint, params = {}) {
    return this.client.get(endpoint, { params });
  }

  /**
   * POST request
   * @param {string} endpoint - API endpoint
   * @param {Object} data - Request body
   * @returns {Promise}
   */
  async post(endpoint, data) {
    return this.client.post(endpoint, data);
  }

  /**
   * PUT request
   * @param {string} endpoint - API endpoint
   * @param {Object} data - Request body
   * @returns {Promise}
   */
  async put(endpoint, data) {
    return this.client.put(endpoint, data);
  }

  /**
   * PATCH request
   * @param {string} endpoint - API endpoint
   * @param {Object} data - Request body
   * @returns {Promise}
   */
  async patch(endpoint, data) {
    return this.client.patch(endpoint, data);
  }

  /**
   * DELETE request
   * @param {string} endpoint - API endpoint
   * @returns {Promise}
   */
  async delete(endpoint) {
    return this.client.delete(endpoint);
  }

  /**
   * Batch requests with retry logic
   * @param {Array} requests - Array of request configs
   * @param {number} maxRetries - Maximum retry attempts
   * @returns {Promise<Array>}
   */
  async batchRequests(requests, maxRetries = 3) {
    return Promise.allSettled(
      requests.map(req => this.retryRequest(req, maxRetries))
    );
  }

  /**
   * Retry failed request with exponential backoff
   * @param {Object} config - Request config
   * @param {number} retries - Remaining retries
   * @returns {Promise}
   */
  async retryRequest(config, retries = 3) {
    try {
      return await this.client.request(config);
    } catch (error) {
      if (retries > 0 && error.response?.status >= 500) {
        const delay = Math.pow(2, 3 - retries) * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
        return this.retryRequest(config, retries - 1);
      }
      throw error;
    }
  }

  /**
   * Stream large data responses
   * @param {string} endpoint - API endpoint
   * @returns {Stream}
   */
  stream(endpoint) {
    return this.client.get(endpoint, { responseType: 'stream' }).then(res => res.data);
  }
}

module.exports = APIClient;
