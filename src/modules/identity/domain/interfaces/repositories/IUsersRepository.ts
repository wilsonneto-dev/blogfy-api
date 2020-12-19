import User from '@modules/identity/domain/entities/User';

interface IUsersRepository {
  create(userData: Pick<User, 'name' | 'email' | 'password'>): Promise<User>;
  findUserByEmail(email: string): Promise<User | null>;
}

export default IUsersRepository;
