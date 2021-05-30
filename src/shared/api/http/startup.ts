import app from '@shared/api/http/app';
import { IHTTPConfiguration } from '@config/HTTPConfiguration';
import { container } from 'tsyringe';

const httpConfiguration: IHTTPConfiguration = container.resolve(
  'HTTPConfiguration',
);

app.listen(httpConfiguration.port, () => {
  // eslint-disable-next-line no-console
  // console.log(`running on http://localhost:${httpConfiguration.port}/`);
});
