import 'reflect-metadata';

import FakeUserRepository from '@modules/identity/infra/data/mocks/repositories/FakeUsersRepository';
import User from '../entities/User';
import Workspace from '../entities/Workspace';
import UserNotFoundException from '../errors/UserNotFoundException';
import UserWithoutPermissionsException from '../errors/UserWithoutPermissionsException';
import GetUserInfoService from './GetUserInfoService';

let fakeUsersReposity: FakeUserRepository;
let savedUserId: string;
const fakeUser = <User>{
  name: 'User test',
  email: 'E-mail test',
  password: '',
  workspaces: [
    <Workspace>{
      id: '12345679',
      name: 'workspace',
      url: 'workspacetest',
    },
  ],
};

describe('GetUserInfoService', () => {
  beforeAll(async () => {
    fakeUsersReposity = new FakeUserRepository();
    const { id } = await fakeUsersReposity.create(fakeUser);
    savedUserId = id!;
  });

  it('should return valid data if user exists', async () => {
    const getUserInfoService = new GetUserInfoService(fakeUsersReposity);

    const response = await getUserInfoService.execute({
      userId: savedUserId,
      workspaceId: fakeUser.workspaces![0].id!,
    });

    expect(response).toHaveProperty('id', savedUserId);
    expect(response).toHaveProperty('name', fakeUser.name);
    expect(response).toHaveProperty('email', fakeUser.email);
    expect(response).toHaveProperty('workspaceId', fakeUser.workspaces![0].id);
    expect(response).toHaveProperty('workspace', fakeUser.workspaces![0].name);
  });

  it('should throw exception for a non existing user', async () => {
    const getUserInfoService = new GetUserInfoService(fakeUsersReposity);

    await expect(
      getUserInfoService.execute({
        userId: `wrong-id-${savedUserId}`,
        workspaceId: fakeUser.workspaces![0].id!,
      }),
    ).rejects.toBeInstanceOf(UserNotFoundException);
  });

  it('should throw exception for a existing user but without permissions in workspace', async () => {
    const getUserInfoService = new GetUserInfoService(fakeUsersReposity);

    await expect(
      getUserInfoService.execute({
        userId: savedUserId,
        workspaceId: `wrong-id-${fakeUser.workspaces![0].id}`,
      }),
    ).rejects.toBeInstanceOf(UserWithoutPermissionsException);
  });
});
