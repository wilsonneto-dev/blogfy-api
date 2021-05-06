import { inject } from 'tsyringe';
import InvalidRecoveryPasswordTokenException from '../errors/InvalidRecoveryPasswordTokenException';
import IRecoveryPasswordTokenRepository from '../interfaces/repositories/IRecoveryPasswordTokenRepository';
import IUsersRepository from '../interfaces/repositories/IUsersRepository';
import ICheckRecoveryPasswordTokenService, {
  ICheckRecoveryPasswordTokenServiceRequest,
  ICheckRecoveryPasswordTokenServiceResponse,
} from '../interfaces/services/ICheckRecoveryPasswordTokenService';

class CheckRecoveryPasswordTokenService
  implements ICheckRecoveryPasswordTokenService {
  constructor(
    @inject('RecoveryPasswordTokenRepository')
    private _recoveryPasswordTokenRepository: IRecoveryPasswordTokenRepository,

    @inject('UsersRepository')
    private _usersRepository: IUsersRepository,
  ) {}

  async execute({
    token,
    email,
  }: ICheckRecoveryPasswordTokenServiceRequest): Promise<
    ICheckRecoveryPasswordTokenServiceResponse
  > {
    const matchedToken = await this._recoveryPasswordTokenRepository.findByToken(
      token,
    );
    if (!matchedToken) throw new InvalidRecoveryPasswordTokenException();

    const hoursToTokenExpires = 3;
    const hoursToTokenExpireInMilisseconds =
      1000 * 60 * 60 * hoursToTokenExpires;
    const currentDateTime = new Date();
    const dateTimeToExpireLimitInMilisseconds = new Date(
      currentDateTime.getTime() - hoursToTokenExpireInMilisseconds,
    ).getTime();

    const tokenDatetimeInMilisseconds = matchedToken.date.getTime();

    if (tokenDatetimeInMilisseconds < dateTimeToExpireLimitInMilisseconds)
      throw new InvalidRecoveryPasswordTokenException();

    const user = await this._usersRepository.findUserByEmail(email);
    if (!user || matchedToken.userId !== user.id)
      throw new InvalidRecoveryPasswordTokenException();

    const serviceResponse: ICheckRecoveryPasswordTokenServiceResponse = {
      valid: true,
    };

    return serviceResponse;
  }
}

export default CheckRecoveryPasswordTokenService;
