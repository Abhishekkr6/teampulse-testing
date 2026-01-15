/**
 * Database Configuration
 * Connection settings and configuration for different environments
 */

interface DatabaseConfig {
  host: string;
  port: number;
  database: string;
  user: string;
  password: string;
  ssl: boolean;
  pool: {
    min: number;
    max: number;
  };
}

const configs: Record<string, DatabaseConfig> = {
  development: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME || 'app_dev',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    ssl: false,
    pool: {
      min: 2,
      max: 10,
    },
  },

  production: {
    host: process.env.DB_HOST || 'prod-db.example.com',
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME || 'app_prod',
    user: process.env.DB_USER || '',
    password: process.env.DB_PASSWORD || '',
    ssl: true,
    pool: {
      min: 5,
      max: 20,
    },
  },

  test: {
    host: 'localhost',
    port: 5432,
    database: 'app_test',
    user: 'test_user',
    password: 'test_password',
    ssl: false,
    pool: {
      min: 1,
      max: 5,
    },
  },
};

const environment = process.env.NODE_ENV || 'development';

export const databaseConfig: DatabaseConfig = configs[environment];

export const getConnectionString = (): string => {
  const { user, password, host, port, database } = databaseConfig;
  return `postgresql://${user}:${password}@${host}:${port}/${database}`;
};

export default databaseConfig;
