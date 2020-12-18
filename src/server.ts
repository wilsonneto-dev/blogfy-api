import express from 'express';
import router from './routes';

import './database';

const app = express();
app.use(express.json());

app.use(router);

app.get('/', (request, response) => {
  const a = { t: 2 };
  response.json({ ok: true, a });
});

app.listen(3000, () => {
  console.log('running on http://localhost:3000/');
});
