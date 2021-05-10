import User from '@modules/identity/domain/entities/User';
import IUsersRepository from '@modules/identity/domain/interfaces/repositories/IUsersRepository';
import IMongooseModelMapper from '../mappers/interface/IMongooseModelMapper';
import UserModelMapper from '../mappers/UserModelMapper';
import UserModel from '../models/UserModel';

class UsersRepository implements IUsersRepository {
  private _userModelMapper: IMongooseModelMapper<User>;

  constructor() {
    this._userModelMapper = new UserModelMapper();
  }

  async create(user: User): Promise<User> {
    const model = this._userModelMapper.fromDomainEntity(user);
    await model.save();
    return this._userModelMapper.toDomainEntity(model);
  }

  async update(user: User): Promise<User> {
    const model = this._userModelMapper.fromDomainEntity(user);
    await model.save();
    return this._userModelMapper.toDomainEntity(model);
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const model = await UserModel.findOne({ email }).exec();
    if (!model) return null;
    return this._userModelMapper.toDomainEntity(model);
  }

  async findById(id: string): Promise<User | null> {
    const model = await UserModel.findById(id).exec();
    if (!model) return null;
    return this._userModelMapper.toDomainEntity(model);
  }
}

export default UsersRepository;
