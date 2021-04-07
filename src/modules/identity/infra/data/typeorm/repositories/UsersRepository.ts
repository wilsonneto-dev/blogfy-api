import User from '@modules/identity/domain/entities/User';
import IUsersRepository from '@modules/identity/domain/interfaces/repositories/IUsersRepository';
import { getRepository, Repository } from 'typeorm';
import UserSchema from '../schemas/UserSchema';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository<User>(UserSchema);
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.ormRepository.findOne(id, {
      relations: ['workspaces'],
    });
    return user || null;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const user = await this.ormRepository.findOne(
      { email },
      { relations: ['workspaces'] },
    );
    return user || null;
  }

  public async create(user: User): Promise<User> {
    const savedUser = this.ormRepository.create(user);
    await this.ormRepository.save(savedUser);
    return savedUser;
  }
}

export default UsersRepository;
