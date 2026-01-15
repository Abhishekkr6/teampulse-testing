/**
 * Validation Rules
 * Centralized validation schemas
 */

import * as yup from 'yup';

export const emailSchema = yup.string().email('Invalid email').required('Email is required');

export const passwordSchema = yup
  .string()
  .min(6, 'Password must be at least 6 characters')
  .required('Password is required');

export const nameSchema = yup.string().min(2, 'Name must be at least 2 characters').required('Name is required');

export const loginSchema = yup.object().shape({
  email: emailSchema,
  password: passwordSchema,
});

export const signupSchema = yup.object().shape({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

export const profileSchema = yup.object().shape({
  name: nameSchema,
  email: emailSchema,
  bio: yup.string().max(500, 'Bio must be less than 500 characters'),
  avatar: yup.string().url('Invalid avatar URL'),
});

/**
 * Validation functions
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const validatePhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^\+?(\d{1,3})?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
  return phoneRegex.test(phone);
};
