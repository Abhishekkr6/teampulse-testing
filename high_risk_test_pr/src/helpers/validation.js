/**
 * Validation Helpers
 * Common validation functions for forms and data
 */

/**
 * Validate email address
 * @param {string} email - Email to validate
 * @returns {boolean} Valid email
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

/**
 * Validate strong password
 * @param {string} password - Password to validate
 * @returns {Object} Validation result with details
 */
function validatePassword(password) {
  const errors = [];
  
  if (password.length < 12) errors.push('Must be at least 12 characters');
  if (!/[A-Z]/.test(password)) errors.push('Must contain uppercase letter');
  if (!/[a-z]/.test(password)) errors.push('Must contain lowercase letter');
  if (!/[0-9]/.test(password)) errors.push('Must contain number');
  if (!/[!@#$%^&*]/.test(password)) errors.push('Must contain special character');

  return {
    isValid: errors.length === 0,
    errors,
    strength: getPasswordStrength(password)
  };
}

/**
 * Calculate password strength
 * @param {string} password - Password to analyze
 * @returns {string} Strength level
 */
function getPasswordStrength(password) {
  let strength = 0;
  if (password.length >= 12) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[!@#$%^&*]/.test(password)) strength++;

  const levels = ['very weak', 'weak', 'fair', 'good', 'strong', 'very strong'];
  return levels[strength] || 'invalid';
}

/**
 * Validate URL format
 * @param {string} url - URL to validate
 * @returns {boolean} Valid URL
 */
function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate phone number (US format)
 * @param {string} phone - Phone number
 * @returns {boolean} Valid phone
 */
function isValidPhone(phone) {
  const phoneRegex = /^(\+1)?[-.\s]?\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}$/;
  return phoneRegex.test(phone.replace(/\D/g, ''));
}

/**
 * Validate credit card number (Luhn algorithm)
 * @param {string} cardNumber - Card number
 * @returns {boolean} Valid card
 */
function isValidCreditCard(cardNumber) {
  const digits = cardNumber.replace(/\D/g, '');
  if (digits.length < 13 || digits.length > 19) return false;

  let sum = 0;
  let isEven = false;

  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits[i], 10);

    if (isEven) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
}

/**
 * Validate form object
 * @param {Object} formData - Form data to validate
 * @param {Object} rules - Validation rules
 * @returns {Object} Validation errors
 */
function validateForm(formData, rules) {
  const errors = {};

  Object.entries(rules).forEach(([field, fieldRules]) => {
    const value = formData[field];
    
    if (fieldRules.required && !value) {
      errors[field] = `${field} is required`;
    }

    if (fieldRules.minLength && value?.length < fieldRules.minLength) {
      errors[field] = `${field} must be at least ${fieldRules.minLength} characters`;
    }

    if (fieldRules.maxLength && value?.length > fieldRules.maxLength) {
      errors[field] = `${field} must not exceed ${fieldRules.maxLength} characters`;
    }

    if (fieldRules.pattern && !fieldRules.pattern.test(value)) {
      errors[field] = `${field} format is invalid`;
    }

    if (fieldRules.custom && !fieldRules.custom(value)) {
      errors[field] = `${field} is invalid`;
    }
  });

  return errors;
}

/**
 * Sanitize user input to prevent XSS
 * @param {string} input - User input
 * @returns {string} Sanitized input
 */
function sanitizeInput(input) {
  if (typeof input !== 'string') return input;
  
  return input
    .replace(/[<>]/g, char => char === '<' ? '&lt;' : '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

module.exports = {
  isValidEmail,
  validatePassword,
  getPasswordStrength,
  isValidUrl,
  isValidPhone,
  isValidCreditCard,
  validateForm,
  sanitizeInput
};
