import 'reflect-metadata';

import FakeRecoveryPasswordTokensRepository from '@modules/identity/infra/data/mocks/repositories/FakeRecoveryPasswordTokensRepository';
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
let fakeUserId: string;

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

const fakeSecondUser = <User>{
  email: 'second@email.com',
  name: 'Second',
  password: '123456',
  workspaces: [],
};

describe('CheckRecoveryPasswordTokenService', () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUserRepository();
    fakeRecoveryPasswordTokenRepository = new FakeRecoveryPasswordTokensRepository();

    const savedUser = await fakeUsersRepository.create(fakeUser);
    await fakeUsersRepository.create(fakeSecondUser);

    fakeUserId = savedUser.id!;

    fakeRecoveryPasswordTokenRepository.create({
      userId: fakeUserId,
      token: fakeToken,
      date: new Date(),
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

  it('should throw exception if provided the correct token but with a non existing email', async () => {
    await expect(
      checkRecoveryPasswordTokenService.execute({
        token: fakeToken,
        email: `non-existing-${fakeUser.email}`,
      }),
    ).rejects.toBeInstanceOf(InvalidRecoveryPasswordTokenException);
  });

  it(
    'should throw exception if provided the correct token but with a ' +
      'existing email but different from the token related email',
    async () => {
      await expect(
        checkRecoveryPasswordTokenService.execute({
          token: fakeToken,
          email: fakeSecondUser.email,
        }),
      ).rejects.toBeInstanceOf(InvalidRecoveryPasswordTokenException);
    },
  );

  it('should throw exception if token is correct but expired', async () => {
    const hoursToTokenExpires = 3;
    const expiredToken = '987654321-9987654-987654';
    const currentDateTime = new Date();
    const hoursToExpireInMilisseconds =
      1000 * 60 * 60 * (hoursToTokenExpires + 1);

    const datetimeExpired = new Date(
      currentDateTime.getTime() - hoursToExpireInMilisseconds,
    );

    fakeRecoveryPasswordTokenRepository.create({
      token: expiredToken,
      userId: fakeUserId,
      date: datetimeExpired,
    });

    await expect(
      checkRecoveryPasswordTokenService.execute({
        token: expiredToken,
        email: fakeUser.email,
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
