import dotenv from 'dotenv';
dotenv.config();

export default {
  development: {
    client: 'mysql2', // funciona también con MariaDB
    connection: {
      host:     process.env.DB_HOST || 'localhost',
      user:     process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'testdb'
    },
    migrations: {
      directory: './migrations'
    }
  }
};