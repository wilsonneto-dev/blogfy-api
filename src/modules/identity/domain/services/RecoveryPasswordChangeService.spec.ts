/* eslint-disable max-classes-per-file */
import 'reflect-metadata';

import FakeRecoveryPasswordTokensRepository from '@modules/identity/infra/data/mocks/repositories/FakeRecoveryPasswordTokensRepository';
import FakeUserRepository from '@modules/identity/infra/data/mocks/repositories/FakeUsersRepository';
import FakePasswordHashProvider from '@modules/identity/infra/providers/mocks/FakeHashProvider';
import User from '../entities/User';
import Workspace from '../entities/Workspace';
import InvalidRecoveryPasswordTokenException from '../errors/InvalidRecoveryPasswordTokenException';
import IRecoveryPasswordTokenRepository from '../interfaces/repositories/IRecoveryPasswordTokenRepository';
import IUsersRepository from '../interfaces/repositories/IUsersRepository';
import RecoveryPasswordChangeService from './RecoveryPasswordChangeService';
import ICheckRecoveryPasswordTokenService, {
  ICheckRecoveryPasswordTokenServiceRequest,
  ICheckRecoveryPasswordTokenServiceResponse,
} from '../interfaces/services/ICheckRecoveryPasswordTokenService';

class FakeCheckRecoveryPasswordTokenServiceFailure
  implements ICheckRecoveryPasswordTokenService {
  async execute(
    // eslint-disable-next-line no-unused-vars
    _: ICheckRecoveryPasswordTokenServiceRequest,
  ): Promise<ICheckRecoveryPasswordTokenServiceResponse> {
    return { valid: false };
  }
}

class FakeCheckRecoveryPasswordTokenServiceSuccess
  implements ICheckRecoveryPasswordTokenService {
  async execute(
    // eslint-disable-next-line no-unused-vars
    _: ICheckRecoveryPasswordTokenServiceRequest,
  ): Promise<ICheckRecoveryPasswordTokenServiceResponse> {
    return { valid: true };
  }
}

let fakeRecoveryPasswordTokenRepository: IRecoveryPasswordTokenRepository;
let fakeUsersRepository: IUsersRepository;
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

describe('RecoveryPasswordChangeService', () => {
  beforeEach(async () => {
    fakeRecoveryPasswordTokenRepository = new FakeRecoveryPasswordTokensRepository();
    fakeUsersRepository = new FakeUserRepository();

    const fakeSavedUser = await fakeUsersRepository.create(fakeUser);
    await fakeRecoveryPasswordTokenRepository.create({
      date: new Date(),
      token: fakeToken,
      userId: fakeSavedUser.id!,
    });
  });

  it("should throw exception when token is valid but user does't exists", async () => {
    const recoveryPasswordChangeService = new RecoveryPasswordChangeService(
      fakeUsersRepository,
      new FakeCheckRecoveryPasswordTokenServiceSuccess(),
      new FakePasswordHashProvider(),
      new FakeRecoveryPasswordTokensRepository(),
    );

    await expect(
      recoveryPasswordChangeService.execute({
        token: fakeToken,
        email: 'invalid-email',
        newPassword: 'newpassword',
      }),
    ).rejects.toBeInstanceOf(InvalidRecoveryPasswordTokenException);
  });

  it('should throw exception when check token service returns false', async () => {
    const recoveryPasswordChangeService = new RecoveryPasswordChangeService(
      fakeUsersRepository,
      new FakeCheckRecoveryPasswordTokenServiceFailure(),
      new FakePasswordHashProvider(),
      new FakeRecoveryPasswordTokensRepository(),
    );

    await expect(
      recoveryPasswordChangeService.execute({
        token: fakeToken,
        email: 'invalid-email',
        newPassword: 'newpassword',
      }),
    ).rejects.toBeInstanceOf(InvalidRecoveryPasswordTokenException);
  });

  it('should change user password when everything is ok', async () => {
    const recoveryPasswordChangeService = new RecoveryPasswordChangeService(
      fakeUsersRepository,
      new FakeCheckRecoveryPasswordTokenServiceSuccess(),
      new FakePasswordHashProvider(),
      new FakeRecoveryPasswordTokensRepository(),
    );

    const serviceResponse = await recoveryPasswordChangeService.execute({
      token: fakeToken,
      email: fakeUser.email,
      newPassword: 'newpassword',
    });

    expect(serviceResponse.success).toBe(true);
  });

  it('should delete user past tokens', async () => {
    const fakeRecoveryPasswordTokensRepository = new FakeRecoveryPasswordTokensRepository();
    const fakeFunction = jest.fn();
    fakeRecoveryPasswordTokensRepository.deleteByUserId = fakeFunction;

    const recoveryPasswordChangeService = new RecoveryPasswordChangeService(
      fakeUsersRepository,
      new FakeCheckRecoveryPasswordTokenServiceSuccess(),
      new FakePasswordHashProvider(),
      fakeRecoveryPasswordTokensRepository,
    );

    const serviceResponse = await recoveryPasswordChangeService.execute({
      token: fakeToken,
      email: fakeUser.email,
      newPassword: 'newpassword',
    });

    expect(serviceResponse.success).toBe(true);
    expect(fakeFunction).toBeCalled();
  });
});
