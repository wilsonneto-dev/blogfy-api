import { inject } from 'tsyringe';
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

  async execute(
    request: ICheckRecoveryPasswordTokenServiceRequest,
  ): Promise<ICheckRecoveryPasswordTokenServiceResponse> {
    return {} as ICheckRecoveryPasswordTokenServiceResponse;
  }
}

export default CheckRecoveryPasswordTokenService;
