import 'reflect-metadata';

import FakeRecoveryPasswordTokenRepository from '@modules/identity/infra/data/mocks/repositories/FakeRecoveryPasswordTokenRepository';
import FakeUserRepository from '@modules/identity/infra/data/mocks/repositories/FakeUsersRepository';
import User from '../entities/User';
import Workspace from '../entities/Workspace';
import InvalidRecoveryPasswordTokenException from '../errors/InvalidRecoveryPasswordTokenException';
import IRecoveryPasswordTokenRepository from '../interfaces/repositories/IRecoveryPasswordTokenRepository';
import IUsersRepository from '../interfaces/repositories/IUsersRepository';
import ICheckRecoveryPasswordTokenService from '../interfaces/services/ICheckRecoveryPasswordTokenService';
import CheckRecoveryPasswordTokenService from './CheckRecoveryPasswordTokenService';

let checkRecoveryPasswordTokenService: ICheckRecoveryPasswordTokenService;
let fakeRecoveryPasswordTokenRepository: IRecoveryPasswordTokenRepository;
let fakeUsersRepository: IUsersRepository;

const fakeToken = '8888-6666-7777-9999';
const fakeUser = <User>{
  name: 'User test',
  email: 'E-mail test',
  password: '654987',
  id: '123456-123456-123456',
  workspaces: [
    <Workspace>{
      id: '12345679',
      name: 'workspace',
      url: 'workspacetest',
    },
  ],
};

describe('CheckRecoveryPasswordTokenService', () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUserRepository();
    fakeRecoveryPasswordTokenRepository = new FakeRecoveryPasswordTokenRepository();

    const savedUser = await fakeUsersRepository.create(fakeUser);
    fakeRecoveryPasswordTokenRepository.create({
      userId: savedUser.id!,
      token: fakeToken,
    });

    checkRecoveryPasswordTokenService = new CheckRecoveryPasswordTokenService(
      fakeRecoveryPasswordTokenRepository,
      fakeUsersRepository,
    );
  });

  it('should throw exception if provided an invalid token', async () => {
    await expect(
      checkRecoveryPasswordTokenService.execute({
        email: fakeUser.email,
        token: `invalid-${fakeToken}`,
      }),
    ).rejects.toBeInstanceOf(InvalidRecoveryPasswordTokenException);
  });

  it('should throw exception if provided the correct token but with a diferent email', async () => {
    await expect(
      checkRecoveryPasswordTokenService.execute({
        token: fakeToken,
        email: `diferet-${fakeUser.email}`,
      }),
    ).rejects.toBeInstanceOf(InvalidRecoveryPasswordTokenException);
  });

  it('should return valid when everything is ok', async () => {
    const response = await checkRecoveryPasswordTokenService.execute({
      token: fakeToken,
      email: fakeUser.email,
    });

    expect(response.valid).toBe(true);
  });
});
