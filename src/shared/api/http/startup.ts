import app from '@shared/api/http/app';
import config from '@config/http';

app.listen(config.port, () => {
  // eslint-disable-next-line no-console
  console.log(`running on http://localhost:${config.port}/`);
});
