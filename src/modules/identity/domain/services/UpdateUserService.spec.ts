import 'reflect-metadata';

import FakeUserRepository from '@modules/identity/infra/data/mocks/repositories/FakeUsersRepository';
import User from '../entities/User';
import Workspace from '../entities/Workspace';
import EmailAlreadyExistsException from '../errors/EmailAlreadyExistsException';
import IUsersRepository from '../interfaces/repositories/IUsersRepository';
import IUpdateUserService from '../interfaces/services/IUpdateUserService';
import UpdateUserService from './UpdateUserService';
import UserNotFoundException from '../errors/UserNotFoundException';

const fakeUser = <User>{
  name: 'User test',
  email: 'mail@test.com',
  password: '123456',
  id: '123456789',
  workspaces: [
    <Workspace>{
      id: 'workspace-01',
      name: 'workspace',
      url: 'workspacetest',
    },
  ],
};

const fakeSecondUser = <User>{
  name: 'User test 02',
  email: 'mail@test02.com',
  password: '123456',
  id: '123456789',
  workspaces: [
    <Workspace>{
      id: 'workspace-02',
      name: 'workspace',
      url: 'workspacetest02',
    },
  ],
};

let usersRepository: IUsersRepository;
let fakeUserId: string;

describe('UpdateUserService', () => {
  beforeEach(async () => {
    usersRepository = new FakeUserRepository();
    const savedUser = await usersRepository.create(fakeUser);
    await usersRepository.create(fakeSecondUser);

    fakeUserId = savedUser.id!;
  });

  it('should throw exception if user tries to update email to a existing user email', async () => {
    const updateUserService: IUpdateUserService = new UpdateUserService(
      usersRepository,
    );

    await expect(
      updateUserService.execute({
        userId: fakeUserId,
        email: fakeSecondUser.email,
        name: fakeUser.name,
      }),
    ).rejects.toBeInstanceOf(EmailAlreadyExistsException);
  });

  it("should throw exception if provided user id doesn't exists in database", async () => {
    const updateUserService: IUpdateUserService = new UpdateUserService(
      usersRepository,
    );

    await expect(
      updateUserService.execute({
        userId: `non-existing-user-id`,
        email: 'emailforothertest@test.com',
        name: 'another name',
      }),
    ).rejects.toBeInstanceOf(UserNotFoundException);
  });

  it('should update the user if providade right informations (name, email)', async () => {
    const updateUserService: IUpdateUserService = new UpdateUserService(
      usersRepository,
    );

    const newInfos = {
      name: 'Name updated',
      email: 'emailatualizado@teste.com',
    };

    const serviceResponse = await updateUserService.execute({
      userId: fakeUserId,
      ...newInfos,
    });

    expect(serviceResponse.userId).toEqual(fakeUserId);
    expect(serviceResponse.name).toEqual(newInfos.name);
    expect(serviceResponse.email).toEqual(newInfos.email);
  });

  it('should update the user if providade right informations (only name)', async () => {
    const updateUserService: IUpdateUserService = new UpdateUserService(
      usersRepository,
    );

    const newInfos = {
      name: 'Novo Name',
    };

    const serviceResponse = await updateUserService.execute({
      userId: fakeUserId,
      email: fakeUser.email,
      ...newInfos,
    });

    expect(serviceResponse.userId).toEqual(fakeUserId);
    expect(serviceResponse.name).toEqual(newInfos.name);
    expect(serviceResponse.email).toEqual(fakeUser.email);
  });
});
