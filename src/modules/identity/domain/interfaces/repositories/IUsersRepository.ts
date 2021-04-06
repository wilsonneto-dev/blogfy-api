import User from '@modules/identity/domain/entities/User';

interface IUsersRepository {
  create(user: User): Promise<User>;
  findUserByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
}

export default IUsersRepository;
