import { inject, injectable } from 'tsyringe';
import InvalidRecoveryPasswordTokenException from '../errors/InvalidRecoveryPasswordTokenException';
import IHashProvider from '../interfaces/providers/IHashProvider';
import IRecoveryPasswordTokensRepository from '../interfaces/repositories/IRecoveryPasswordTokenRepository';
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

    @inject('RecoveryPasswordTokensRepository')
    private _recoveryPasswordTokensRepository: IRecoveryPasswordTokensRepository,
  ) {}

  async execute({
    token,
    email,
    newPassword,
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

    const hashedPassword = await this._hashProvider.hash(newPassword);
    user.password = hashedPassword;

    await this._usersRepository.update(user);

    await this._recoveryPasswordTokensRepository.deleteByUserId(user.id!);

    return {
      success: true,
    } as IRecoveryPasswordChangeServiceResponse;
  }
}

export default RecoveryPasswordChangeService;
