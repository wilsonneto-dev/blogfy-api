import express from 'express';
import { errors as celebrateErrors } from 'celebrate';
import dotenv from 'dotenv';
import 'express-async-errors';
import '@shared/api/container';

// import '@shared/infra/data/typeorm';
import '@shared/infra/data/mongoose';

import errorsHandler from '@shared/api/http/middlewares/errors';
import config from '@config/http';

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

app.listen(config.port, () => {
  // eslint-disable-next-line no-console
  console.log(`running on http://localhost:${config.port}/`);
});
