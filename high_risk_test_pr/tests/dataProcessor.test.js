/**
 * Test Suite for Data Processor
 * Tests data transformation and validation functions
 */

import { describe, it, expect, beforeEach } from '@jest/globals';
import {
  transformUserData,
  validateEmail,
  processCSVData,
  aggregateMetrics,
} from '../src/utils/dataProcessor';

describe('DataProcessor', () => {
  describe('transformUserData', () => {
    it('should transform user object correctly', () => {
      const input = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
      };

      const output = transformUserData(input);

      expect(output).toHaveProperty('fullName', 'John Doe');
      expect(output).toHaveProperty('email', 'john@example.com');
    });

    it('should handle missing fields', () => {
      const input = { firstName: 'Jane' };
      expect(() => transformUserData(input)).not.toThrow();
    });
  });

  describe('validateEmail', () => {
    it('should validate correct emails', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('user+tag@domain.co.uk')).toBe(true);
    });

    it('should reject invalid emails', () => {
      expect(validateEmail('invalid.email')).toBe(false);
      expect(validateEmail('no@domain')).toBe(false);
      expect(validateEmail('')).toBe(false);
    });
  });

  describe('processCSVData', () => {
    let csvData;

    beforeEach(() => {
      csvData = 'name,age,city\nJohn,30,NYC\nJane,25,LA';
    });

    it('should parse CSV data correctly', () => {
      const result = processCSVData(csvData);

      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({ name: 'John', age: '30', city: 'NYC' });
    });

    it('should handle empty CSV', () => {
      const result = processCSVData('');
      expect(result).toEqual([]);
    });
  });

  describe('aggregateMetrics', () => {
    it('should calculate correct statistics', () => {
      const data = [
        { value: 10, category: 'A' },
        { value: 20, category: 'A' },
        { value: 30, category: 'B' },
      ];

      const result = aggregateMetrics(data, 'category', 'value');

      expect(result.A).toBe(30);
      expect(result.B).toBe(30);
    });

    it('should handle empty array', () => {
      const result = aggregateMetrics([], 'key', 'value');
      expect(result).toEqual({});
    });
  });
});
