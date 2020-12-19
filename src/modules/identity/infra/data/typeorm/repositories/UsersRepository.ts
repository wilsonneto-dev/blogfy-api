import User from '@modules/identity/domain/entities/User';
import IUsersRepository from '@modules/identity/domain/interfaces/repositories/IUsersRepository';
import { getRepository, Repository } from 'typeorm';
import UserSchema from '../schemas/UserSchema';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository<User>(UserSchema);
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const user = await this.ormRepository.findOne({ email });
    return user || null;
  }

  public async create({
    name,
    email,
    password,
  }: Required<Pick<User, 'name' | 'email' | 'password'>>): Promise<User> {
    const user = this.ormRepository.create({ name, email, password });
    await this.ormRepository.save(user);
    return user;
  }
}

export default UsersRepository;
