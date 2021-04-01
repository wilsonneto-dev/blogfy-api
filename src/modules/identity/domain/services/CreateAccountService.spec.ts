/* eslint-disable no-undef */
import FakeUserRepository from '@modules/identity/infra/data/mocks/repositories/FakeUsersRepository';
import FakeWorkspaceRepository from '@modules/identity/infra/data/mocks/repositories/FakeWorkspaceRepository';
import FakePasswordHashProvider from '@modules/identity/infra/providers/mocks/FakeHashProvider';
import 'reflect-metadata';
import EmailAlreadyExistsException from '../errors/EmailAlreadyExistsException';
import WorkspaceUrlAlreadyExistsException from '../errors/WorkspaceUrlAlreadyExistsException';
import { ICreateAccountServiceRequest } from '../interfaces/services/ICreateAccountService';
import CreateAccountService from './CreateAccountService';

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
    secondFakeCreateAccountServiceRequest.email =
      fakeCreateAccountServiceRequest.email;

    const firstResponse = await createAccountService.execute(
      fakeCreateAccountServiceRequest,
    );

    expect(
      createAccountService.execute(secondFakeCreateAccountServiceRequest),
    ).rejects.toThrow(EmailAlreadyExistsException);

    expect(
      createAccountService.execute(secondFakeCreateAccountServiceRequest),
    ).rejects.toThrow(WorkspaceUrlAlreadyExistsException);

    expect(firstResponse.userId).not.toBeFalsy();
    expect(firstResponse.workspaceId).not.toBeFalsy();
  });

  // it('should not create a workspace with duplicated URL', () => {});
});
