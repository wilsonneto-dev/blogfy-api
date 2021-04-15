import { inject, injectable } from 'tsyringe';
import User from '../entities/User';
import EmailAlreadyExistsException from '../errors/EmailAlreadyExistsException';
import UserNotFoundException from '../errors/UserNotFoundException';
import IUsersRepository from '../interfaces/repositories/IUsersRepository';
import IUpdateUserservice, {
  IUpdateUserServiceRequest,
  IUpdateUserServiceResponse,
} from '../interfaces/services/IUpdateUserService';

@injectable()
class UpdateUserService implements IUpdateUserservice {
  constructor(
    @inject('UsersRepository') private _usersRepository: IUsersRepository,
  ) {}

  async execute({
    userId,
    email,
    name,
  }: IUpdateUserServiceRequest): Promise<IUpdateUserServiceResponse> {
    const userWithSameEmail = await this._usersRepository.findUserByEmail(
      email,
    );

    if (userWithSameEmail && userWithSameEmail.id !== userId)
      throw new EmailAlreadyExistsException();

    let userToUpdate: User | null;
    if (userWithSameEmail) userToUpdate = userWithSameEmail;
    else userToUpdate = await this._usersRepository.findById(userId);

    if (!userToUpdate) throw new UserNotFoundException();

    userToUpdate.email = email;
    userToUpdate.name = name;

    const updatedUser = await this._usersRepository.update(userToUpdate);

    return {
      email: updatedUser.email,
      name: updatedUser.name,
      userId: updatedUser.id,
    } as IUpdateUserServiceResponse;
  }
}

export default UpdateUserService;
