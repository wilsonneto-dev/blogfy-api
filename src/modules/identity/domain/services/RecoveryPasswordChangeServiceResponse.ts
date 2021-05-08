import { inject, injectable } from 'tsyringe';
import InvalidRecoveryPasswordTokenException from '../errors/InvalidRecoveryPasswordTokenException';
import IHashProvider from '../interfaces/providers/IHashProvider';
import IUsersRepository from '../interfaces/repositories/IUsersRepository';
import ICheckRecoveryPasswordTokenService from '../interfaces/services/ICheckRecoveryPasswordTokenService';
import IRecoveryPasswordChangeService, {
  IRecoveryPasswordChangeServiceRequest,
  IRecoveryPasswordChangeServiceResponse,
} from '../interfaces/services/IRecoveryPasswordChangeService';

@injectable()
class RecoveryPasswordChangeService implements IRecoveryPasswordChangeService {
  constructor(
    @inject('UsersRepository')
    private _usersRepository: IUsersRepository,

    @inject('CheckRecoveryPasswordTokenService')
    private _checkRecoveryPasswordTokenService: ICheckRecoveryPasswordTokenService,

    @inject('HashProvider')
    private _hashProvider: IHashProvider,
  ) {}

  async execute({
    token,
    email,
    newPasword,
  }: IRecoveryPasswordChangeServiceRequest): Promise<
    IRecoveryPasswordChangeServiceResponse
  > {
    const checkTokenResponse = await this._checkRecoveryPasswordTokenService.execute(
      {
        token,
        email,
      },
    );

    if (checkTokenResponse.valid === false)
      throw new InvalidRecoveryPasswordTokenException();

    const user = await this._usersRepository.findUserByEmail(email);
    if (!user) throw new InvalidRecoveryPasswordTokenException();

    const hashedPassword = await this._hashProvider.hash(newPasword);
    user.password = hashedPassword;

    await this._usersRepository.update(user);

    return {
      success: true,
    } as IRecoveryPasswordChangeServiceResponse;
  }
}

export default RecoveryPasswordChangeService;
