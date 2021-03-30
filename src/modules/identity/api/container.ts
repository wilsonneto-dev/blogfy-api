import { container } from 'tsyringe';

import BcryptPasswordHashProvider from '../infra/providers/BcryptPasswordHashProvider';
import IPasswordHashProvider from '../domain/interfaces/providers/IPasswordHashProvider';
import ICreateUserService from '../domain/interfaces/services/ICreateUserService';
import CreateUserService from '../domain/services/user/CreateUserService';
import IUsersRepository from '../domain/interfaces/repositories/IUsersRepository';
import UsersRepository from '../infra/data/typeorm/repositories/UsersRepository';
import ICreateWorkspaceService from '../domain/interfaces/services/ICreateWorkspaceService';
import CreateWorkspaceService from '../domain/services/workspace/CreateWorkspaceService';
import IWorkspacesRepository from '../domain/interfaces/repositories/IWorkspaceRepository';
import WorkspacesRepository from '../infra/data/typeorm/repositories/WorkspaceRepository';

// services
container.register<ICreateUserService>('CreateUserService', CreateUserService);
container.register<ICreateWorkspaceService>('CreateWorkspaceService', CreateWorkspaceService);

// repositories
container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
container.registerSingleton<IWorkspacesRepository>(
  'WorkspacesRepository',
  WorkspacesRepository,
);

// providers
container.register<IPasswordHashProvider>(
  'PasswordHashProvider', BcryptPasswordHashProvider,
);
