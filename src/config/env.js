import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join('./.env') });

export const env = {
  appName: process.env.APP_NAME,
  port: process.env.PORT,
  hostName: process.env.HOST_NAME,
  dbName: process.env.DB_NAME,
  dbPassword: process.env.DB_PASSWORD,
  dbUser: process.env.DB_USER,
  nodeEnv: process.env.NODE_ENV,
  mailUser: process.env.MAIL_USER,
  mailPassword: process.env.MAIL_PASSWORD,
  mailHost: process.env.MAIL_HOST,
  mailPort: process.MAIL_PORT,
  accessTokenSecreteKey: process.env.ACCESS_TOKEN_SECRET,
  refreshTokenSecreteKey: process.env.REFRESH_TOKEN_SECRET
};
