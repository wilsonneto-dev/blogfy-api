import { container } from 'tsyringe';

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
import IRefreshTokenService from '../domain/interfaces/services/IRefreshTokenService';
import RefreshTokenService from '../domain/services/RefreshTokenService';
import IUpdateUserService from '../domain/interfaces/services/IUpdateUserService';
import UpdateUserService from '../domain/services/UpdateUserService';
import IUpdateWorkspaceService from '../domain/interfaces/services/IUpdateWorkspaceService';
import UpdateWorkspaceService from '../domain/services/UpdateWorkspaceService';
import IUpdatePasswordService from '../domain/interfaces/services/IUpdatePasswordService';
import UpdatePasswordService from '../domain/services/UpdatePasswordService';
import IRandomTokenProvider from '../domain/interfaces/providers/IRandomTokenProvider';
import UuidRandomTokenProvider from '../infra/providers/UuidRandomTokenProvider';
import FakeTransactionalEmailProvider from '../infra/providers/mocks/FakeTransactionalEmailProvider';
import ITransactionalEmailProvider from '../domain/interfaces/providers/ITransactionalEmailProvider';
import RecoveryPasswordTokensRepository from '../infra/data/typeorm/repositories/RecoveryPasswordTokensRepository';
import IRecoveryPasswordTokensRepository from '../domain/interfaces/repositories/IRecoveryPasswordTokenRepository';
import IRecoveryPasswordService from '../domain/interfaces/services/IRecoveryPasswordService';
import RecoveryPasswordService from '../domain/services/RecoveryPasswordService';
import ICheckRecoveryPasswordTokenService from '../domain/interfaces/services/ICheckRecoveryPasswordTokenService';
import CheckRecoveryPasswordTokenService from '../domain/services/CheckRecoveryPasswordTokenService';
import IRecoveryPasswordChangeService from '../domain/interfaces/services/IRecoveryPasswordChangeService';
import RecoveryPasswordChangeService from '../domain/services/RecoveryPasswordChangeService';

// services
container.register<ICreateAccountService>(
  'CreateAccountService',
  CreateAccountService,
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

container.register<IRefreshTokenService>(
  'RefreshTokenService',
  RefreshTokenService,
);

container.register<IUpdateUserService>('UpdateUserService', UpdateUserService);

container.register<IUpdateWorkspaceService>(
  'UpdateWorkspaceService',
  UpdateWorkspaceService,
);

container.register<IUpdatePasswordService>(
  'UpdatePasswordService',
  UpdatePasswordService,
);

container.register<IRecoveryPasswordService>(
  'RecoveryPasswordService',
  RecoveryPasswordService,
);

container.register<ICheckRecoveryPasswordTokenService>(
  'CheckRecoveryPasswordTokenService',
  CheckRecoveryPasswordTokenService,
);

container.register<IRecoveryPasswordChangeService>(
  'RecoveryPasswordChangeService',
  RecoveryPasswordChangeService,
);

// providers
container.register<IHashProvider>('HashProvider', BcryptHashProvider);

container.register<IAuthenticationTokenProvider>(
  'AuthenticationTokenProvider',
  JWTAuthenticationTokenProvider,
);

container.register<IRandomTokenProvider>(
  'RandomTokenProvider',
  UuidRandomTokenProvider,
);
container.register<ITransactionalEmailProvider>(
  'TransactionalEmailProvider',
  FakeTransactionalEmailProvider,
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

container.registerSingleton<IRecoveryPasswordTokensRepository>(
  'RecoveryPasswordTokensRepository',
  RecoveryPasswordTokensRepository,
);
