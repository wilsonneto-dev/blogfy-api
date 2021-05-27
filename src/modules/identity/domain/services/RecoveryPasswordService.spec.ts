import 'reflect-metadata';
import FakeUserRepository from '@modules/identity/infra/data/mocks/repositories/FakeUsersRepository';
import FakeRandomTokenProvider from '@modules/identity/infra/providers/mocks/FakeRandomTokenProvider';
import FakeRecoveryPasswordTokensRepository from '@modules/identity/infra/data/mocks/repositories/FakeRecoveryPasswordTokensRepository';
import FakeTransactionalEmailProvider from '@modules/identity/infra/providers/mocks/FakeTransactionalEmailProvider';
import User from '../entities/User';
import Workspace from '../entities/Workspace';
import UserNotFoundException from '../errors/UserNotFoundException';
import IUsersRepository from '../interfaces/repositories/IUsersRepository';
import IRecoveryPasswordService from '../interfaces/services/IRecoveryPasswordService';
import RecoveryPasswordService from './RecoveryPasswordService';

const fakeUser = <User>{
  name: 'User test',
  email: 'test@test.com',
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

let fakeUsersRepository: IUsersRepository;
let recoveryPasswordService: IRecoveryPasswordService;
let fakeRecoveryPasswordTokenRepository: FakeRecoveryPasswordTokensRepository;

describe('RecoveryPasswordService', () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUserRepository();
    fakeRecoveryPasswordTokenRepository = new FakeRecoveryPasswordTokensRepository();
    await fakeUsersRepository.create(fakeUser);

    recoveryPasswordService = new RecoveryPasswordService(
      fakeUsersRepository,
      new FakeRandomTokenProvider(),
      fakeRecoveryPasswordTokenRepository,
      new FakeTransactionalEmailProvider(),
    );
  });

  it('should throw exception if providade a non existing e-mail', async () => {
    await expect(
      recoveryPasswordService.execute({ email: 'non-existing-email@test.com' }),
    ).rejects.toBeInstanceOf(UserNotFoundException);
  });

  it('should run ok if e-mail exists', async () => {
    const serviceResponse = await recoveryPasswordService.execute({
      email: fakeUser.email,
    });
    expect(serviceResponse.success).toEqual(true);
    expect(serviceResponse.emailStatus).toBeTruthy();
  });

  it('should exclude past tokens for this user', async () => {
    await recoveryPasswordService.execute({
      email: fakeUser.email,
    });

    const fakeFunction = jest.fn();
    fakeRecoveryPasswordTokenRepository.deleteByUserId = fakeFunction;

    await recoveryPasswordService.execute({
      email: fakeUser.email,
    });

    expect(fakeRecoveryPasswordTokenRepository.deleteByUserId).toBeCalled();
  });
});
