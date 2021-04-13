import 'reflect-metadata';

import FakeUserRepository from '@modules/identity/infra/data/mocks/repositories/FakeUsersRepository';
import FakeAuthenticationTokenProvider from '@modules/identity/infra/providers/mocks/FakeAuthenticationTokenProvider';
import User from '../entities/User';
import Workspace from '../entities/Workspace';
import InvalidaAuthenticationTokenException from '../errors/InvalidAuthenticationTokenException';
import UserNotFoundException from '../errors/UserNotFoundException';
import UserWithoutPermissionsException from '../errors/UserWithoutPermissionsException';
import IAuthenticationTokenProvider from '../interfaces/providers/IAuthenticationTokenProvider';
import IUsersRepository from '../interfaces/repositories/IUsersRepository';
import IRefreshTokenService from '../interfaces/services/IRefreshTokenService';
import RefreshTokenService from './RefreshTokenService';

const fakeUser = <User>{
  name: 'User test',
  email: 'mail@test.com',
  password: '',
  id: '123456789',
  workspaces: [
    <Workspace>{
      id: 'workspace-01',
      name: 'workspace',
      url: 'workspacetest',
    },
    <Workspace>{
      id: 'workspace-02',
      name: 'workspace 02',
      url: 'workspace02',
    },
  ],
};

let fakeUsersRepository: IUsersRepository;
let fakeAuthenticationTokenProvider: IAuthenticationTokenProvider;

describe('RefreshTokenService', () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUserRepository();
    const { id } = await fakeUsersRepository.create(fakeUser);
    fakeUser.id = id;

    fakeAuthenticationTokenProvider = new FakeAuthenticationTokenProvider();
  });

  it('should return valid new tokens when receive a valid token', async () => {
    const validRefreshToken = fakeAuthenticationTokenProvider.generateRefreshToken(
      fakeUser,
      fakeUser.workspaces![0],
    );

    const refreshTokenService: IRefreshTokenService = new RefreshTokenService(
      fakeUsersRepository,
      fakeAuthenticationTokenProvider,
    );
    const response = await refreshTokenService.execute({
      refreshToken: validRefreshToken,
    });

    expect(response.token).toBeTruthy();
    expect(response.refreshToken).toBeTruthy();
  });

  it('should throws a excpection if the provided refresh token is invalid', async () => {
    const refreshTokenService: IRefreshTokenService = new RefreshTokenService(
      fakeUsersRepository,
      fakeAuthenticationTokenProvider,
    );

    await expect(
      refreshTokenService.execute({ refreshToken: 'invalid-token' }),
    ).rejects.toBeInstanceOf(InvalidaAuthenticationTokenException);
  });

  it('should throw exception if provided a non existing user', async () => {
    const nonExistingUser: User = {
      id: 'wrong-id',
      email: 'test@domain.com',
      name: 'Wilson',
    };

    const validTokenFromANonExistingUser = fakeAuthenticationTokenProvider.generateRefreshToken(
      nonExistingUser,
      fakeUser.workspaces![0],
    );

    const refreshTokenService: IRefreshTokenService = new RefreshTokenService(
      fakeUsersRepository,
      fakeAuthenticationTokenProvider,
    );

    await expect(
      refreshTokenService.execute({
        refreshToken: validTokenFromANonExistingUser,
      }),
    ).rejects.toBeInstanceOf(UserNotFoundException);
  });

  it('should throw excpetion if provided a non existing workspace', async () => {
    const nonExistingWorkspace: Workspace = {
      name: 'Workspace 02',
      url: 'workspace-02',
      id: '123456-789987',
    };

    const validRefreshToken = fakeAuthenticationTokenProvider.generateRefreshToken(
      fakeUser,
      nonExistingWorkspace,
    );

    const refreshTokenService: IRefreshTokenService = new RefreshTokenService(
      fakeUsersRepository,
      fakeAuthenticationTokenProvider,
    );

    await expect(
      refreshTokenService.execute({
        refreshToken: validRefreshToken,
      }),
    ).rejects.toBeInstanceOf(UserWithoutPermissionsException);
  });
});
