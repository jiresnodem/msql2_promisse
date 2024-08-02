import { pool } from './config/db.js';
import express from 'express';
import userRouter from './routers/user.router.js';
import roleRouter from './routers/role.router.js';
import categoryRouter from './routers/category.router.js';
import { env } from './config/env.js';
import { errorHandle } from './middlewares/errorHandle.js';
import { notFound } from './middlewares/notFound.js';
import morgan from 'morgan';
import { verifyJWT } from './middlewares/verifyJWT.js';
import cookieParser from 'cookie-parser';
import cors from "cors";
import { corsOptions } from './config/corsOptions.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swaggerSpec.js';


// Test the connection to database
(async () => {
  try {
    await pool.getConnection();
    console.log('Database connection successfully !!!');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
})();

const app = express();

app.use(express.static("public"));
app.use(morgan('dev'));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//Definition of the different endpoints of our application
app.use('/api/auth', userRouter);


app.use(verifyJWT)
app.use('/api/categories', categoryRouter);
app.use('/api/roles', roleRouter);





// handling of urls not found
app.use(notFound);
// handling of errors
app.use(errorHandle);

app.listen(env.port, env.hostName, () => {
  console.log('====================================');
  console.log(
    `Our application ${env.appName} running on port: http://${env.hostName}:${env.port}`,
  );
  console.log(`Swagger documentation available on http://${env.hostName}:${env.port}/api-docs`);
  console.log('====================================');
});
