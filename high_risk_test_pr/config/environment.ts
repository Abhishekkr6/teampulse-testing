/**
 * Environment Configuration
 * Loads and validates environment variables
 */

interface EnvConfig {
  NODE_ENV: 'development' | 'production' | 'test';
  PORT: number;
  API_URL: string;
  DATABASE_URL: string;
  JWT_SECRET: string;
  JWT_EXPIRY: string;
  LOG_LEVEL: string;
}

const getEnvVariable = (key: string, defaultValue?: string): string => {
  const value = process.env[key];

  if (!value && !defaultValue) {
    console.warn(`Environment variable ${key} is not set`);
    return '';
  }

  return value || defaultValue || '';
};

export const envConfig: EnvConfig = {
  NODE_ENV: (process.env.NODE_ENV as 'development' | 'production' | 'test') || 'development',
  PORT: parseInt(getEnvVariable('PORT', '3000')),
  API_URL: getEnvVariable('API_URL', 'http://localhost:3000'),
  DATABASE_URL: getEnvVariable('DATABASE_URL'),
  JWT_SECRET: getEnvVariable('JWT_SECRET', 'your-secret-key'),
  JWT_EXPIRY: getEnvVariable('JWT_EXPIRY', '7d'),
  LOG_LEVEL: getEnvVariable('LOG_LEVEL', 'info'),
};

export const validateEnv = (): boolean => {
  const required = ['DATABASE_URL', 'JWT_SECRET'];

  for (const key of required) {
    if (!process.env[key]) {
      console.error(`Missing required environment variable: ${key}`);
      return false;
    }
  }

  return true;
};

export default envConfig;
