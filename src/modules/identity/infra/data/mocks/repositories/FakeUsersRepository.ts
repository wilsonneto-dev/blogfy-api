import IUsersRepository from '@modules/identity/domain/interfaces/repositories/IUsersRepository';
import User from '@modules/identity/domain/entities/User';

class FakeUsersRepository implements IUsersRepository {
  private base: Array<User> = [];

  async create(user: User): Promise<User> {
    let newUser: User = new User();
    const id = `${Math.floor(Math.random() * 1000)}`;
    newUser = { ...user, ...{ id } };

    this.base.push(newUser);
    return newUser;
  }

  async update(user: User): Promise<User> {
    const userInMemoryIndex = this.base.findIndex(
      _user => _user.id === user.id,
    );

    if (userInMemoryIndex === -1) this.base.push(user);
    else this.base[userInMemoryIndex] = user;

    return this.base[userInMemoryIndex];
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.base.find(user => user.email === email) || null;
  }

  async findById(id: string): Promise<User | null> {
    return this.base.find(user => user.id === id) || null;
  }
}

export default FakeUsersRepository;
