import 'reflect-metadata';
import FakeUserRepository from '@modules/identity/infra/data/mocks/repositories/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import FakePasswordHashProvider from '@modules/identity/infra/providers/mocks/FakePasswordHashProvider';
import CreateUserService, {
  ICreateUserServiceRequest,
} from './CreateUserService';

const fakeUserData: ICreateUserServiceRequest = {
  name: 'test user',
  email: 'email',
  password: 'testpassword',
};

describe('CreateUserService', () => {
  it('should be able to create a new User', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakePasswordhashProvider = new FakePasswordHashProvider();
    const createUserService = new CreateUserService(
      fakeUserRepository,
      fakePasswordhashProvider,
    );

    const userCreated = await createUserService.execute(fakeUserData);
    expect(userCreated).toHaveProperty('id');
    expect(userCreated.id).not.toBe('');

    expect(userCreated.password).not.toBe(fakeUserData.password);

    const fakeUserDataClone = { ...fakeUserData };
    delete fakeUserDataClone.password;
    expect(userCreated).toMatchObject(fakeUserDataClone);
  });

  it('should be not able to create a user with a duplicated e-mail', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakePasswordhashProvider = new FakePasswordHashProvider();
    const createUserService = new CreateUserService(
      fakeUserRepository,
      fakePasswordhashProvider,
    );

    await createUserService.execute(fakeUserData);

    expect(createUserService.execute(fakeUserData)).rejects.toBeInstanceOf(
      typeof AppError,
    );
  });
});
