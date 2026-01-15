/**
 * Data Processing Utility Module
 * Handles complex data transformations and batch processing operations
 */

const lodash = require('lodash');

/**
 * Process and normalize user data from multiple sources
 * @param {Array} users - Array of user objects
 * @param {Object} options - Processing options
 * @returns {Array} Normalized user data
 */
function processUserData(users, options = {}) {
  const {
    removeInactive = true,
    formatEmails = true,
    validatePhones = true
  } = options;

  let processed = users.map(user => ({
    ...user,
    email: formatEmails ? user.email.toLowerCase().trim() : user.email,
    name: `${user.firstName} ${user.lastName}`.trim(),
    phone: validatePhones ? sanitizePhoneNumber(user.phone) : user.phone,
    lastLogin: new Date(user.lastLogin),
    isActive: user.status === 'active'
  }));

  if (removeInactive) {
    processed = processed.filter(user => user.isActive);
  }

  return processed.sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Transform database records to API response format
 * @param {Array} records - Database records
 * @returns {Array} API formatted data
 */
function transformToApiFormat(records) {
  return records.map(record => ({
    id: record._id.toString(),
    name: record.name,
    description: record.description || '',
    metadata: {
      created: record.createdAt,
      updated: record.updatedAt,
      version: record.__v
    },
    relationships: {
      owner: record.ownerId,
      tags: record.tags || []
    }
  }));
}

/**
 * Batch process items with rate limiting
 * @param {Array} items - Items to process
 * @param {Function} processor - Processing function
 * @param {number} batchSize - Items per batch
 * @returns {Promise<Array>} Processed items
 */
async function batchProcess(items, processor, batchSize = 10) {
  const results = [];
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    const batchResults = await Promise.all(
      batch.map(item => processor(item))
    );
    results.push(...batchResults);
    await new Promise(resolve => setTimeout(resolve, 100)); // Rate limit
  }
  return results;
}

/**
 * Sanitize phone number to standard format
 * @param {string} phone - Phone number
 * @returns {string} Formatted phone
 */
function sanitizePhoneNumber(phone) {
  return phone.replace(/\D/g, '').slice(-10);
}

/**
 * Aggregate statistics from data array
 * @param {Array} data - Data array
 * @param {string} field - Field to aggregate
 * @returns {Object} Aggregated statistics
 */
function aggregateStats(data, field) {
  const values = data.map(item => item[field]).filter(v => v != null);
  
  return {
    count: values.length,
    sum: values.reduce((a, b) => a + b, 0),
    avg: values.reduce((a, b) => a + b, 0) / values.length,
    min: Math.min(...values),
    max: Math.max(...values),
    median: getMedian(values)
  };
}

/**
 * Calculate median value
 * @param {Array} values - Sorted array of values
 * @returns {number} Median value
 */
function getMedian(values) {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

module.exports = {
  processUserData,
  transformToApiFormat,
  batchProcess,
  sanitizePhoneNumber,
  aggregateStats,
  getMedian
};
