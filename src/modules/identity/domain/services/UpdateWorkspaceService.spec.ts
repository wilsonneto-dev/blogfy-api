import 'reflect-metadata';

import FakeUserRepository from '@modules/identity/infra/data/mocks/repositories/FakeUsersRepository';
import FakeWorkspacesRepository from '@modules/identity/infra/data/mocks/repositories/FakeWorkspacesRepository';
import User from '../entities/User';
import Workspace from '../entities/Workspace';
import UserNotFoundException from '../errors/UserNotFoundException';
import UserWithoutPermissionsException from '../errors/UserWithoutPermissionsException';
import WorkspaceUrlAlreadyExistsException from '../errors/WorkspaceUrlAlreadyExistsException';
import IUsersRepository from '../interfaces/repositories/IUsersRepository';
import IWorkspacesRepository from '../interfaces/repositories/IWorkspaceRepository';
import IUpdateWorkspaceService from '../interfaces/services/IUpdateWorkspaceService';
import UpdateWorkspaceService from './UpdateWorkspaceService';

const fakeWorkspace: Workspace = {
  name: 'Workspace Fake',
  url: 'workspace-url-01',
};

const fakeSecondWorkspace: Workspace = {
  name: 'Workspace Fake',
  url: 'workspace-url-02',
};

const fakeUser: User = {
  name: 'Wilson',
  email: 'test@test.com',
  password: '123456',
};

let fakeWorkspaceId: string;
let fakeSecondWorkspaceId: string;
let fakeWorkspacesRepository: IWorkspacesRepository;

let fakeUserId: string;
let fakeUsersRepository: IUsersRepository;

describe('UpdateWorkspaceService', () => {
  beforeEach(async () => {
    fakeWorkspacesRepository = new FakeWorkspacesRepository();
    const savedWorkspace = await fakeWorkspacesRepository.create(fakeWorkspace);
    const savedSecondWorkspace = await fakeWorkspacesRepository.create(
      fakeSecondWorkspace,
    );
    fakeWorkspaceId = savedWorkspace.id!;
    fakeSecondWorkspaceId = savedSecondWorkspace.id!;

    const userToSave: User = {
      ...fakeUser,
      workspaces: [savedWorkspace],
    };

    fakeUsersRepository = new FakeUserRepository();
    const savedUser = await fakeUsersRepository.create(userToSave);
    fakeUserId = savedUser.id!;
  });

  it('should throw exception when provided a non existing user id', async () => {
    const updateWorkspaceService: IUpdateWorkspaceService = new UpdateWorkspaceService(
      fakeWorkspacesRepository,
      fakeUsersRepository,
    );

    await expect(
      updateWorkspaceService.execute({
        workspaceId: fakeWorkspaceId,
        userId: `wrong-id-${fakeUserId}`,
        name: 'workspace test',
        url: 'workspace-that-doesnt-exists',
      }),
    ).rejects.toBeInstanceOf(UserNotFoundException);
  });

  it('should throw exception when provided a user without workspace permission', async () => {
    const updateWorkspaceService: IUpdateWorkspaceService = new UpdateWorkspaceService(
      fakeWorkspacesRepository,
      fakeUsersRepository,
    );

    await expect(
      updateWorkspaceService.execute({
        workspaceId: fakeSecondWorkspaceId,
        userId: fakeUserId,
        name: 'workspace test',
        url: 'workspace-that-doesnt-exists',
      }),
    ).rejects.toBeInstanceOf(UserWithoutPermissionsException);
  });

  it('should throw exception when provided a invalid workspace id', async () => {
    const updateWorkspaceService: IUpdateWorkspaceService = new UpdateWorkspaceService(
      fakeWorkspacesRepository,
      fakeUsersRepository,
    );

    await expect(
      updateWorkspaceService.execute({
        workspaceId: `wrong-id-${fakeWorkspaceId}`,
        userId: fakeUserId,
        name: 'workspace test',
        url: 'workspace-that-doesnt-exists',
      }),
    ).rejects.toBeInstanceOf(UserWithoutPermissionsException);
  });

  it('should throw exception if target url already exists', async () => {
    const updateWorkspaceService: IUpdateWorkspaceService = new UpdateWorkspaceService(
      fakeWorkspacesRepository,
      fakeUsersRepository,
    );
    await expect(
      updateWorkspaceService.execute({
        workspaceId: fakeWorkspaceId,
        userId: fakeUserId,
        name: fakeWorkspace.name,
        url: fakeSecondWorkspace.url,
      }),
    ).rejects.toBeInstanceOf(WorkspaceUrlAlreadyExistsException);
  });

  it('should update the workspace if everything is ok', async () => {
    const updateWorkspaceService: IUpdateWorkspaceService = new UpdateWorkspaceService(
      fakeWorkspacesRepository,
      fakeUsersRepository,
    );

    const newInfos = {
      url: 'new-url',
      name: 'new-name',
    };

    const response = await updateWorkspaceService.execute({
      workspaceId: fakeWorkspaceId,
      userId: fakeUserId,
      name: newInfos.name,
      url: newInfos.url,
    });

    expect(response.workspaceId).toEqual(fakeWorkspaceId);
    expect(response.name).toEqual(newInfos.name);
    expect(response.url).toEqual(newInfos.url);
  });

  it('should update the workspace if everything is ok (without url)', async () => {
    const updateWorkspaceService: IUpdateWorkspaceService = new UpdateWorkspaceService(
      fakeWorkspacesRepository,
      fakeUsersRepository,
    );

    const newInfos = {
      name: 'new-name',
    };

    const response = await updateWorkspaceService.execute({
      userId: fakeUserId,
      workspaceId: fakeWorkspaceId,
      name: newInfos.name,
      url: fakeWorkspace.url,
    });

    expect(response.workspaceId).toEqual(fakeWorkspaceId);
    expect(response.name).toEqual(newInfos.name);
    expect(response.url).toEqual(fakeWorkspace.url);
  });
});
