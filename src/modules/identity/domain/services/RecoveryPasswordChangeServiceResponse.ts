import { inject, injectable } from 'tsyringe';
import IRecoveryPasswordTokenRepository from '../interfaces/repositories/IRecoveryPasswordTokenRepository';
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

    @inject('RecoveryPasswordTokenRepositoy')
    private _recoveryPasswordTokensRepository: IRecoveryPasswordTokenRepository,

    @inject('CheckRecoveryPasswordTokenService')
    private _checkRecoveryPasswordTokenService: ICheckRecoveryPasswordTokenService,
  ) {}

  async execute(
    request: IRecoveryPasswordChangeServiceRequest,
  ): Promise<IRecoveryPasswordChangeServiceResponse> {
    return {} as IRecoveryPasswordChangeServiceResponse;
  }
}

export default RecoveryPasswordChangeService;
