import mysql from 'mysql2/promise';
import { env } from './env.js';

const createPool = () => {
  try {
    const pool = mysql.createPool({
      host: env.dbHost,
      user: env.dbUser,
      database: env.dbName,
      password: env.dbPassword,
    });
    console.log('Connected to the database');
    return pool;
  } catch (error) {
    console.error('Could not connect to the database:', error);
    process.exit(1);
  }
};

export const pool = createPool();

// const connectDB = async () => {
//   try {
//     const connection = await mysql.createConnection({
//       host: 'localhost',
//       user: 'root',
//       password: 'password',
//       database: 'database_name',
//     });
//     console.log('Connected to the database');
//     return connection;
//   } catch (error) {
//     console.error('Could not connect to the database:', error);
//     process.exit(1);
//   }
// };

// const connection = connectDB();
