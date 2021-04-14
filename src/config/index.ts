import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();

if (envFound.error) {
  throw new Error('Cannot find .env file');
}

const port: string = process.env.PORT || '3000';

export default {
  port: parseInt(port, 10),
  databaseUrl: process.env.DB_CONNECTION,
  api: { prefix: '/api' },
}
