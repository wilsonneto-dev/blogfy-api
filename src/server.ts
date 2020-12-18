import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import router from './routes';

import './database';
import AppError from './errors/AppError';

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
    });
  },
);

app.listen(3000, () => {
  console.log('running on http://localhost:3000/');
});
