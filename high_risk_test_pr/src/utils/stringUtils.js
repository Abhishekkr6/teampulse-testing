/**
 * String Utilities
 * Common string manipulation functions
 */

/**
 * Convert camelCase to kebab-case
 * @param {string} str - Input string
 * @returns {string} Kebab-case string
 */
function camelToKebab(str) {
  return str.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);
}

/**
 * Convert snake_case to camelCase
 * @param {string} str - Input string
 * @returns {string} camelCase string
 */
function snakeToCamel(str) {
  return str.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
}

/**
 * Truncate string with ellipsis
 * @param {string} str - Input string
 * @param {number} length - Max length
 * @returns {string} Truncated string
 */
function truncate(str, length = 50) {
  return str.length > length ? str.substring(0, length) + '...' : str;
}

/**
 * Capitalize first letter
 * @param {string} str - Input string
 * @returns {string} Capitalized string
 */
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Generate slug from string
 * @param {string} str - Input string
 * @returns {string} URL slug
 */
function slugify(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Count words in string
 * @param {string} str - Input string
 * @returns {number} Word count
 */
function wordCount(str) {
  return str.trim().split(/\s+/).filter(word => word.length > 0).length;
}

/**
 * Extract domain from email
 * @param {string} email - Email address
 * @returns {string} Domain name
 */
function extractDomain(email) {
  const match = email.match(/@(.+)/);
  return match ? match[1] : null;
}

module.exports = {
  camelToKebab,
  snakeToCamel,
  truncate,
  capitalize,
  slugify,
  wordCount,
  extractDomain
};
