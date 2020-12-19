import { container } from 'tsyringe';

import UsersRepository from '@modules/identity/infra/data/typeorm/repositories/UsersRepository';
import IUsersRepository from '@modules/identity/domain/interfaces/repositories/IUsersRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
