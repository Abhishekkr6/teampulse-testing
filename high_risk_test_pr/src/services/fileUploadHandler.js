/**
 * File Upload Handler
 * Manages file uploads with validation and storage
 */

const fs = require('fs');
const path = require('path');

class FileUploadHandler {
  constructor(uploadDir = './uploads') {
    this.uploadDir = uploadDir;
    this.ensureUploadDirectory();
  }

  /**
   * Ensure upload directory exists
   */
  ensureUploadDirectory() {
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  /**
   * Validate file
   * @param {Object} file - File object
   * @param {Object} options - Validation options
   * @returns {Object} Validation result
   */
  validateFile(file, options = {}) {
    const {
      maxSize = 5 * 1024 * 1024, // 5MB
      allowedMimes = ['image/jpeg', 'image/png', 'application/pdf'],
      allowedExtensions = ['jpg', 'png', 'pdf']
    } = options;

    const errors = [];

    if (file.size > maxSize) {
      errors.push(`File size exceeds ${maxSize / 1024 / 1024}MB limit`);
    }

    if (!allowedMimes.includes(file.mimetype)) {
      errors.push('File type not allowed');
    }

    const ext = path.extname(file.originalname).substring(1).toLowerCase();
    if (!allowedExtensions.includes(ext)) {
      errors.push('File extension not allowed');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Save uploaded file
   * @param {Object} file - File object
   * @param {string} folder - Subfolder
   * @returns {string} File path
   */
  saveFile(file, folder = '') {
    const filename = `${Date.now()}_${file.originalname}`;
    const filepath = path.join(this.uploadDir, folder, filename);
    
    fs.mkdirSync(path.dirname(filepath), { recursive: true });
    fs.writeFileSync(filepath, file.buffer);
    
    return filepath;
  }

  /**
   * Delete file
   * @param {string} filepath - File path
   */
  deleteFile(filepath) {
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }
  }
}

module.exports = FileUploadHandler;
