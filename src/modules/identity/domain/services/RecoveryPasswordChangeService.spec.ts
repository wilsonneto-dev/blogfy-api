import 'reflect-metadata';

import FakeRecoveryPasswordTokenRepository from '@modules/identity/infra/data/mocks/repositories/FakeRecoveryPasswordTokenRepository';
import FakeUserRepository from '@modules/identity/infra/data/mocks/repositories/FakeUsersRepository';
import User from '../entities/User';
import Workspace from '../entities/Workspace';
import InvalidRecoveryPasswordTokenException from '../errors/InvalidRecoveryPasswordTokenException';
import IRecoveryPasswordTokenRepository from '../interfaces/repositories/IRecoveryPasswordTokenRepository';
import IUsersRepository from '../interfaces/repositories/IUsersRepository';
import IRecoveryPasswordChangeService from '../interfaces/services/IRecoveryPasswordChangeService';
import CheckRecoveryPasswordTokenService from './CheckRecoveryPasswordTokenService';
import RecoveryPasswordChangeService from './RecoveryPasswordChangeServiceResponse';

let recoveryPasswordChangeService: IRecoveryPasswordChangeService;
let fakeRecoveryPasswordTokenRepository: IRecoveryPasswordTokenRepository;
let fakeUsersRepository: IUsersRepository;
let fakeUserId: string;

const fakeToken = '8888-6666-7777-9999';
const fakeUser = <User>{
  name: 'User test',
  email: 'E-mail test',
  password: '654987',
  id: '',
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

describe('RecoveryPasswordChangeService', () => {
  beforeEach(async () => {
    fakeRecoveryPasswordTokenRepository = new FakeRecoveryPasswordTokenRepository();
    fakeUsersRepository = new FakeUserRepository();

    const fakeSavedUser = await fakeUsersRepository.create(fakeUser);
    await fakeRecoveryPasswordTokenRepository.create({
      date: new Date(),
      token: fakeToken,
      userId: fakeSavedUser.id!,
    });

    recoveryPasswordChangeService = new RecoveryPasswordChangeService(
      fakeUsersRepository,
      fakeRecoveryPasswordTokenRepository,
      new CheckRecoveryPasswordTokenService(
        fakeRecoveryPasswordTokenRepository,
        fakeUsersRepository,
      ),
    );
  });

  it('should throw exception when provided an invalid token', async () => {
    await expect(
      recoveryPasswordChangeService.execute({
        token: 'invalid-token',
        email: fakeUser.email,
        newPasword: 'newpassword',
      }),
    ).rejects.toBeInstanceOf(InvalidRecoveryPasswordTokenException);
  });

  it("should throw exception when token is valid but user does't exists", async () => {
    await expect(
      recoveryPasswordChangeService.execute({
        token: fakeToken,
        email: 'invalid-email',
        newPasword: 'newpassword',
      }),
    ).rejects.toBeInstanceOf(InvalidRecoveryPasswordTokenException);
  });

  it('should change user password when everything is ok', async () => {
    const serviceResponse = await recoveryPasswordChangeService.execute({
      token: fakeToken,
      email: fakeUser.email,
      newPasword: 'newpassword',
    });

    expect(serviceResponse.success).toBe(true);
  });
});
