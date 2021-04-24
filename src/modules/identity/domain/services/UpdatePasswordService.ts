import { inject, injectable } from 'tsyringe';
import AuthenticationFailedException from '../errors/AuthenticationFailedException';
import InvalidPasswordException from '../errors/InvalidPasswordException';
import UserNotFoundException from '../errors/UserNotFoundException';
import IHashProvider from '../interfaces/providers/IHashProvider';
import IUsersRepository from '../interfaces/repositories/IUsersRepository';
import IUpdatePasswordService, {
  IUpdatePasswordServiceRequest,
  IUpdatePasswordServiceResponse,
} from '../interfaces/services/IUpdatePasswordService';

@injectable()
class UpdatePasswordService implements IUpdatePasswordService {
  constructor(
    @inject('UsersRepository')
    private _usersRepository: IUsersRepository,

    @inject('HashProvider')
    private _hashProvider: IHashProvider,
  ) {}

  async execute({
    userId,
    currentPassword,
    newPassword,
  }: IUpdatePasswordServiceRequest): Promise<IUpdatePasswordServiceResponse> {
    if (newPassword.trim() === '') throw new InvalidPasswordException();

    const user = await this._usersRepository.findById(userId);
    if (!user) throw new UserNotFoundException();

    const passwordMatch = await this._hashProvider.compare(
      currentPassword,
      user.password!,
    );

    if (!passwordMatch) throw new AuthenticationFailedException();

    user.password = await this._hashProvider.hash(newPassword);
    await this._usersRepository.update(user);

    const serviceResponse: IUpdatePasswordServiceResponse = {
      success: true,
    };

    return serviceResponse;
  }
}

export default UpdatePasswordService;
