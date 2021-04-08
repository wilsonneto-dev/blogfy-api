import { container } from 'tsyringe';

import ICreateUserService from '../domain/interfaces/services/ICreateUserService';
import CreateUserService from '../domain/services/CreateUserService';
import ICreateWorkspaceService from '../domain/interfaces/services/ICreateWorkspaceService';
import CreateWorkspaceService from '../domain/services/CreateWorkspaceService';
import ICreateAccountService from '../domain/interfaces/services/ICreateAccountService';
import CreateAccountService from '../domain/services/CreateAccountService';

import IUsersRepository from '../domain/interfaces/repositories/IUsersRepository';
import UsersRepository from '../infra/data/typeorm/repositories/UsersRepository';
import IWorkspacesRepository from '../domain/interfaces/repositories/IWorkspaceRepository';
import WorkspacesRepository from '../infra/data/typeorm/repositories/WorkspaceRepository';

import IHashProvider from '../domain/interfaces/providers/IHashProvider';
import BcryptHashProvider from '../infra/providers/BcryptPasswordHashProvider';
import IAuthenticateUserService from '../domain/interfaces/services/IAuthenticateUserService';
import AuthenticateUserService from '../domain/services/AuthenticateUserService';
import IAuthenticationTokenProvider from '../domain/interfaces/providers/IAuthenticationTokenProvider';
import JWTAuthenticationTokenProvider from '../infra/providers/JWTAuthenticationTokenProvider';
import IGetUserInfoService from '../domain/interfaces/services/IGetUserInfoService';
import GetUserInfoService from '../domain/services/GetUserInfoService';
import IChangeCurrentWorkspaceService from '../domain/interfaces/services/IChangeCurrentWorkspaceService';
import ChangeCurrentWorkspaceService from '../domain/services/ChangeCurrentWorkspaceService';

// services
container.register<ICreateUserService>('CreateUserService', CreateUserService);
container.register<ICreateAccountService>(
  'CreateAccountService',
  CreateAccountService,
);
container.register<ICreateWorkspaceService>(
  'CreateWorkspaceService',
  CreateWorkspaceService,
);
container.register<IAuthenticateUserService>(
  'AuthenticateUserService',
  AuthenticateUserService,
);
container.register<IGetUserInfoService>(
  'GetUserInfoService',
  GetUserInfoService,
);
container.register<IChangeCurrentWorkspaceService>(
  'ChangeCurrentWorkspaceService',
  ChangeCurrentWorkspaceService,
);

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
container.register<IHashProvider>('HashProvider', BcryptHashProvider);
container.register<IAuthenticationTokenProvider>(
  'AuthenticationTokenProvider',
  JWTAuthenticationTokenProvider,
);
