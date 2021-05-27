import express from 'express';
import { errors as celebrateErrors } from 'celebrate';
import dotenv from 'dotenv';
import 'express-async-errors';

import '@shared/infra/data/typeorm';
import '@shared/api/container';

import errorsHandler from '@shared/api/http/middlewares/errors';
import router from './routes';

dotenv.config();

const app = express();
app.use(express.json());
app.use(router);
app.use(celebrateErrors());
app.use(errorsHandler);

app.get('/', (_request, response) => {
  response.json({ status: 'running' });
});

export default app;
