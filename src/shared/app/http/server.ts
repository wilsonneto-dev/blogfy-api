import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import '@shared/infra/data/typeorm';
import '@shared/container';

import AppError from '@shared/errors/AppError';
import config from '@config/http';

import router from './routes';

const app = express();
app.use(express.json());
app.use(router);

app.get('/', (request, response) => {
  response.json({ status: 'running' });
});

app.use(
  (error: Error, request: Request, response: Response, _: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }

    return response.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
      internalMessage: error.message,
    });
  },
);

app.listen(config.port, () => {
  // eslint-disable-next-line no-console
  console.log(`running on http://localhost:${config.port}/`);
});
