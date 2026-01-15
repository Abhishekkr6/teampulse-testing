/**
 * API Constants
 * Centralized API endpoints and constants
 */

export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api/v1';

export const ENDPOINTS = {
  // Auth
  AUTH_LOGIN: '/auth/login',
  AUTH_SIGNUP: '/auth/signup',
  AUTH_REFRESH: '/auth/refresh',
  AUTH_LOGOUT: '/auth/logout',

  // Users
  USERS_ME: '/users/me',
  USERS_PROFILE: '/users/:id',
  USERS_UPDATE: '/users/:id',
  USERS_DELETE: '/users/:id',

  // Posts
  POSTS_LIST: '/posts',
  POSTS_CREATE: '/posts',
  POSTS_GET: '/posts/:id',
  POSTS_UPDATE: '/posts/:id',
  POSTS_DELETE: '/posts/:id',

  // Comments
  COMMENTS_LIST: '/posts/:postId/comments',
  COMMENTS_CREATE: '/posts/:postId/comments',
  COMMENTS_DELETE: '/comments/:id',

  // Dashboard
  DASHBOARD_STATS: '/dashboard/stats',
  DASHBOARD_ACTIVITY: '/dashboard/activity',
};

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_ERROR: 500,
} as const;

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  SERVER_ERROR: 'Server error. Please try again later.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  UNKNOWN_ERROR: 'An unknown error occurred.',
} as const;

export const REQUEST_TIMEOUT = 30000; // 30 seconds
export const RETRY_ATTEMPTS = 3;
export const RETRY_DELAY = 1000; // 1 second
