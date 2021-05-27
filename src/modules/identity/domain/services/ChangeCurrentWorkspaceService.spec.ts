import 'reflect-metadata';

import FakeUserRepository from '@modules/identity/infra/data/mocks/repositories/FakeUsersRepository';
import FakeAuthenticationTokenProvider from '@modules/identity/infra/providers/mocks/FakeAuthenticationTokenProvider';
import User from '../entities/User';
import Workspace from '../entities/Workspace';
import UserNotFoundException from '../errors/UserNotFoundException';
import UserWithoutPermissionsException from '../errors/UserWithoutPermissionsException';
import IUsersRepository from '../interfaces/repositories/IUsersRepository';
import ChangeCurrentWorkspaceService from './ChangeCurrentWorkspaceService';

const fakeUser = <User>{
  name: 'User test',
  email: 'mail@test.com',
  password: '',
  id: '123456-123456-123456',
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

const fakeSecondUser = <User>{
  name: 'User test 02',
  email: 'mail2@test.com',
  password: '',
  id: '',
  workspaces: [
    <Workspace>{
      id: 'workspace-03',
      name: 'workspace 03',
      url: 'workspacetest03',
    },
    <Workspace>{
      id: 'workspace-04',
      name: 'workspace 04',
      url: 'workspace04',
    },
  ],
};

let _fakeUsersRepository: IUsersRepository;
let fakeUserId: string;

describe('ChangeCurrentWorkspaceService', () => {
  beforeEach(async () => {
    _fakeUsersRepository = new FakeUserRepository();
    const savedUser = await _fakeUsersRepository.create(fakeUser);
    await _fakeUsersRepository.create(fakeSecondUser);
    fakeUserId = savedUser.id!;
  });

  it('should return valid response if request is ok', async () => {
    const _changeCurrentWorkspaceService = new ChangeCurrentWorkspaceService(
      _fakeUsersRepository,
      new FakeAuthenticationTokenProvider(),
    );

    const response = await _changeCurrentWorkspaceService.execute({
      userId: fakeUserId,
      targetWorkspaceId: fakeUser.workspaces![1].id!,
    });

    expect(response.workspace).toEqual(fakeUser.workspaces![1].name);
    expect(response.workspaceId).toEqual(fakeUser.workspaces![1].id!);
    expect(response.token).toBeTruthy();
    expect(response.refreshToken).toBeTruthy();
  });

  it('should throw an exception for non existing users', async () => {
    const _changeCurrentWorkspaceService = new ChangeCurrentWorkspaceService(
      _fakeUsersRepository,
      new FakeAuthenticationTokenProvider(),
    );

    await expect(
      _changeCurrentWorkspaceService.execute({
        userId: `wrong-id`,
        targetWorkspaceId: fakeUser.workspaces![1].id!,
      }),
    ).rejects.toBeInstanceOf(UserNotFoundException);
  });

  it('should throw an exception for users without workspace permissions', async () => {
    const _changeCurrentWorkspaceService = new ChangeCurrentWorkspaceService(
      _fakeUsersRepository,
      new FakeAuthenticationTokenProvider(),
    );

    await expect(
      _changeCurrentWorkspaceService.execute({
        userId: fakeUserId,
        targetWorkspaceId: fakeSecondUser.workspaces![1].id!,
      }),
    ).rejects.toBeInstanceOf(UserWithoutPermissionsException);
  });

  it('should throw an exception for non existing workspace', async () => {
    const _changeCurrentWorkspaceService = new ChangeCurrentWorkspaceService(
      _fakeUsersRepository,
      new FakeAuthenticationTokenProvider(),
    );

    await expect(
      _changeCurrentWorkspaceService.execute({
        userId: fakeUserId,
        targetWorkspaceId: `wrong-id-${fakeSecondUser.workspaces![1].id!}`,
      }),
    ).rejects.toBeInstanceOf(UserWithoutPermissionsException);
  });
});
