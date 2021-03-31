import 'reflect-metadata';

import FakeUserRepository from '@modules/identity/infra/data/mocks/repositories/FakeUsersRepository';
import FakePasswordHashProvider from '@modules/identity/infra/providers/mocks/FakePasswordHashProvider';

import CreateUserService from './CreateUserService';
import { ICreateUserServiceRequest, ICreateUserServiceResponse } from '../../interfaces/services/ICreateUserService';
import EmailAlreadyExistsException from '../errors/EmailAlreadyExistsException';

const fakeCreateUserServiceRequest: ICreateUserServiceRequest = {
	name: "Wilson Gomes",
	email: "contato21sdfdsfdsfsd3@wilsonneto.com.br",
	password: "123456",
	workspace: "Formação Dev",
	workspaceURL: "formacao-dev"
};

describe('CreateUserService', () => {
  it('should be able to create a new User', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakePasswordhashProvider = new FakePasswordHashProvider();
    
    const createUserService = new CreateUserService(
      fakeUserRepository,
      fakePasswordhashProvider,
    );

    const serviceResponse = await createUserService.execute(fakeCreateUserServiceRequest);

    expect(serviceResponse).toHaveProperty('id');
    expect(serviceResponse.id).not.toBe('');

    expect(serviceResponse).toHaveProperty('workspaceId');
    expect(serviceResponse.workspaceId).not.toBe('');

    expect(serviceResponse).toMatchObject<ICreateUserServiceResponse>({
      id: serviceResponse.id,
      workspaceId: serviceResponse.workspaceId,
      name: fakeCreateUserServiceRequest.name,
      email: fakeCreateUserServiceRequest.email,
      workspace: fakeCreateUserServiceRequest.workspace,
      workspaceURL: fakeCreateUserServiceRequest.workspaceURL
    });
  });

  it("shouldn't be able to create a user with a duplicated e-mail", async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakePasswordhashProvider = new FakePasswordHashProvider();
    const createUserService = new CreateUserService(
      fakeUserRepository,
      fakePasswordhashProvider,
    );

    await createUserService.execute(fakeCreateUserServiceRequest);

    expect(createUserService.execute(fakeCreateUserServiceRequest)).rejects.toBeInstanceOf(
      typeof EmailAlreadyExistsException,
    );
  });
});
