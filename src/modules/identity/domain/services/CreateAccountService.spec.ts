import 'reflect-metadata';

import FakeUserRepository from '@modules/identity/infra/data/mocks/repositories/FakeUsersRepository';
import FakeWorkspaceRepository from '@modules/identity/infra/data/mocks/repositories/FakeWorkspaceRepository';
import FakePasswordHashProvider from '@modules/identity/infra/providers/mocks/FakeHashProvider';
import EmailAlreadyExistsException from '@modules/identity/domain/errors/EmailAlreadyExistsException';

import { ICreateAccountServiceRequest } from '@modules/identity/domain/interfaces/services/ICreateAccountService';
import CreateAccountService from './CreateAccountService';
import WorkspaceUrlAlreadyExistsException from '../errors/WorkspaceUrlAlreadyExistsException';

const fakeCreateAccountServiceRequest: ICreateAccountServiceRequest = {
  name: 'User de Teste',
  email: 'test@test.com',
  password: 'password',
  workspace: 'Blog de teste',
  workspaceURL: 'blogdeteste',
};

const secondFakeCreateAccountServiceRequest: ICreateAccountServiceRequest = {
  name: 'User de Teste 02',
  email: 'test02@test.com',
  password: 'password03',
  workspace: 'Blog de teste 02',
  workspaceURL: 'blogdeteste02',
};

describe('CreateAccountService', () => {
  it('should create user and workspace and return both ids', async () => {
    const createAccountService = new CreateAccountService(
      new FakeUserRepository(),
      new FakeWorkspaceRepository(),
      new FakePasswordHashProvider(),
    );

    const response = await createAccountService.execute(
      fakeCreateAccountServiceRequest,
    );

    expect(response.userId).not.toBeFalsy();
    expect(response.workspaceId).not.toBeFalsy();
  });

  it('should not create a user with duplicated email', async () => {
    const createAccountService = new CreateAccountService(
      new FakeUserRepository(),
      new FakeWorkspaceRepository(),
      new FakePasswordHashProvider(),
    );

    const secondRequest = <ICreateAccountServiceRequest>{
      ...secondFakeCreateAccountServiceRequest,
    };
    secondRequest.email = fakeCreateAccountServiceRequest.email;

    const firstResponse = await createAccountService.execute(
      fakeCreateAccountServiceRequest,
    );

    await expect(
      createAccountService.execute(secondRequest),
    ).rejects.toBeInstanceOf(EmailAlreadyExistsException);

    expect(firstResponse.userId).not.toBeFalsy();
    expect(firstResponse.workspaceId).not.toBeFalsy();
  });

  it('should not create a workspace with duplicated URL', async () => {
    const createAccountService = new CreateAccountService(
      new FakeUserRepository(),
      new FakeWorkspaceRepository(),
      new FakePasswordHashProvider(),
    );

    const secondRequest = <ICreateAccountServiceRequest>{
      ...secondFakeCreateAccountServiceRequest,
    };
    secondRequest.workspaceURL = fakeCreateAccountServiceRequest.workspaceURL;

    const firstResponse = await createAccountService.execute(
      fakeCreateAccountServiceRequest,
    );

    await expect(
      createAccountService.execute(secondRequest),
    ).rejects.toBeInstanceOf(WorkspaceUrlAlreadyExistsException);

    expect(firstResponse.userId).not.toBeFalsy();
    expect(firstResponse.workspaceId).not.toBeFalsy();
  });
});
