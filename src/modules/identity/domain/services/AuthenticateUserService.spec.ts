import 'reflect-metadata';

import FakeUserRepository from '@modules/identity/infra/data/mocks/repositories/FakeUsersRepository';
import FakePasswordHashProvider from '@modules/identity/infra/providers/mocks/FakeHashProvider';
import FakeAuthenticationTokenProvider from '@modules/identity/infra/providers/mocks/FakeAuthenticationTokenProvider';
import User from '../entities/User';
import AuthenticationFailedException from '../errors/AuthenticationFailedException';
import AuthenticateUserService from './AuthenticateUserService';
import Workspace from '../entities/Workspace';

const plainTextPassword = '123456';
const fakeUser = <User>{
  name: 'User test',
  email: 'E-mail test',
  password: '',
  id: '123456-123456-123456',
  workspaces: [
    <Workspace>{
      id: '12345679',
      name: 'workspace',
      url: 'workspacetest',
    },
  ],
};

new FakePasswordHashProvider().hash(plainTextPassword).then(hashedPassword => {
  fakeUser.password = hashedPassword;
});

describe('AuthenticateUserService', () => {
  it('should signin with a user that exists', async () => {
    const fakeRepository = new FakeUserRepository();
    const savedFakeUser = await fakeRepository.create(fakeUser);

    const authService: AuthenticateUserService = new AuthenticateUserService(
      fakeRepository,
      new FakePasswordHashProvider(),
      new FakeAuthenticationTokenProvider(),
    );

    const response = await authService.execute({
      email: fakeUser.email,
      password: plainTextPassword,
    });

    expect(response?.id).toEqual(savedFakeUser.id!);
    expect(response?.token).toBeTruthy();
    expect(response?.refreshToken).toBeTruthy();
  });

  it('should not signin with a user that exists but with wrong password', async () => {
    const fakeRepository = new FakeUserRepository();
    fakeRepository.create(fakeUser);

    const authService: AuthenticateUserService = new AuthenticateUserService(
      fakeRepository,
      new FakePasswordHashProvider(),
      new FakeAuthenticationTokenProvider(),
    );

    await expect(
      authService.execute({
        email: fakeUser.email,
        password: `wrong-password-${plainTextPassword}`,
      }),
    ).rejects.toBeInstanceOf(AuthenticationFailedException);
  });

  it('should not signin with a user that not exists', async () => {
    const fakeRepository = new FakeUserRepository();
    fakeRepository.create(fakeUser);

    const authService: AuthenticateUserService = new AuthenticateUserService(
      fakeRepository,
      new FakePasswordHashProvider(),
      new FakeAuthenticationTokenProvider(),
    );

    await expect(
      authService.execute({
        email: `wrong-email-${fakeUser.email}`,
        password: `wrong-password-${plainTextPassword}`,
      }),
    ).rejects.toBeInstanceOf(AuthenticationFailedException);
  });
});
