import 'reflect-metadata';
import FakeUserRepository from '@modules/identity/infra/data/mocks/repositories/FakeUsersRepository';
import FakePasswordHashProvider from '@modules/identity/infra/providers/mocks/FakeHashProvider';
import User from '../entities/User';
import Workspace from '../entities/Workspace';
import UserNotFoundException from '../errors/UserNotFoundException';
import IUsersRepository from '../interfaces/repositories/IUsersRepository';
import UpdatePasswordService from './UpdatePasswordService';
import AuthenticationFailedException from '../errors/AuthenticationFailedException';
import IUpdatePasswordService from '../interfaces/services/IUpdatePasswordService';
import InvalidPasswordException from '../errors/InvalidPasswordException';

const fakeHashProvider = new FakePasswordHashProvider();
const newPassword = '654321';
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

let fakeUserId: string;
let fakeUsersRepository: IUsersRepository;
let updatePasswordService: IUpdatePasswordService;

describe('UpdatePasswordService', () => {
  beforeEach(async () => {
    fakeUser.password = await fakeHashProvider.hash(plainTextPassword);
    fakeUsersRepository = new FakeUserRepository();
    const savedUser = await fakeUsersRepository.create(fakeUser);
    fakeUserId = savedUser.id!;

    updatePasswordService = new UpdatePasswordService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should throw exception if received a non existing user', async () => {
    await expect(
      updatePasswordService.execute({
        userId: 'non-existing-user-id',
        currentPassword: fakeUser.password!,
        newPassword,
      }),
    ).rejects.toBeInstanceOf(UserNotFoundException);
  });

  it('should throw exception if provided wrong current password', async () => {
    await expect(
      updatePasswordService.execute({
        userId: fakeUserId,
        currentPassword: 'wrong-password',
        newPassword,
      }),
    ).rejects.toBeInstanceOf(AuthenticationFailedException);
  });

  it('should throw excpetion if received a empty password for new password', async () => {
    await expect(
      updatePasswordService.execute({
        userId: fakeUserId,
        currentPassword: fakeUser.password!,
        newPassword: '',
      }),
    ).rejects.toBeInstanceOf(InvalidPasswordException);
  });

  it('should update user password if all parameters are ok', async () => {
    const serviceResponse = await updatePasswordService.execute({
      userId: fakeUserId,
      currentPassword: plainTextPassword,
      newPassword,
    });

    expect(serviceResponse.success).toBe(true);
  });
});
