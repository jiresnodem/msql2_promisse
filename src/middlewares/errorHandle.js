import { env } from '../config/env.js';

export const errorHandle = (err, req, res, next) => {
  console.log(err.stack);

  const statusCode =
    !err.statusCode || err.statusCode === 200 || err.statusCode === 201
      ? 500
      : err?.statusCode;
  const message = err.message ? err.message : 'Internal server error ';

  let response = null;
  if (env.nodeEnv === 'developpement') {
    response = {
      meta: {
        message,
        status: statusCode,
      },
      error:  err.error ,
      stack: err.stack ,
    };
  }else{
    response = {
      meta: {
        message,
        status: statusCode,
      },
      error: err.error,
    }
  }

  res.status(statusCode).json(response);
};
