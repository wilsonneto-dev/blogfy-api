import { container } from 'tsyringe';
import '@modules/identity/api/container';

import HTTPConfiguration, {
  IHTTPConfiguration,
} from '@config/HTTPConfiguration';
import IdentityConfiguration, {
  IIdentityConfiguration,
} from '@config/IdentityConfiguration';

// configurations
container.registerInstance<IHTTPConfiguration>(
  'HTTPConfiguration',
  HTTPConfiguration,
);

container.registerInstance<IIdentityConfiguration>(
  'IdentityConfiguration',
  IdentityConfiguration,
);
