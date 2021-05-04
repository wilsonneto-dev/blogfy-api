import { inject, injectable } from 'tsyringe';
import UserNotFoundException from '../errors/UserNotFoundException';
import IRandomTokenProvider from '../interfaces/providers/IRandomTokenProvider';
import ITransactionalEmailProvider from '../interfaces/providers/ITransactionalEmailProvider';
import IRecoveryPasswordTokenRepository from '../interfaces/repositories/IRecoveryPasswordTokenRepository';
import IUsersRepository from '../interfaces/repositories/IUsersRepository';
import IRecoveryPasswordService, {
  IRecoveryPasswordServiceRequest,
  IRecoveryPasswordServiceResponse,
} from '../interfaces/services/IRecoveryPasswordService';

@injectable()
class RecoveryPasswordService implements IRecoveryPasswordService {
  constructor(
    @inject('UsersRepository')
    private _usersRepository: IUsersRepository,

    @inject('RandomTokenProvider')
    private _randomTokenService: IRandomTokenProvider,

    @inject('RecoveryPasswordTokenRepository')
    private _recoveryPasswordTokenRepository: IRecoveryPasswordTokenRepository,

    @inject('TransactionalEmailProvider')
    private _transactionalEmailProvider: ITransactionalEmailProvider,
  ) {}

  async execute({
    email,
  }: IRecoveryPasswordServiceRequest): Promise<
    IRecoveryPasswordServiceResponse
  > {
    const user = await this._usersRepository.findUserByEmail(email);
    if (!user) throw new UserNotFoundException();

    const token = await this._randomTokenService.generate();

    this._recoveryPasswordTokenRepository.create({ token, userId: user.id! });

    // enviar por email - TransactionalEmailProvider
    const {
      deliveryEmailStatus,
    } = await this._transactionalEmailProvider.sendRecoveryPasswordEmail({
      userName: user.name,
      userEmail: user.email,
      linkToRecoveryPassword: `https://appdomain.com/password/recovery?token=${token}`,
    });

    return {
      emailStatus: deliveryEmailStatus,
      success: true,
    } as IRecoveryPasswordServiceResponse;
  }
}

export default RecoveryPasswordService;
