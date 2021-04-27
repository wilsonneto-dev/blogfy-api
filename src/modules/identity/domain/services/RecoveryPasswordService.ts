import { inject, injectable } from 'tsyringe';
import UserNotFoundException from '../errors/UserNotFoundException';
import IRandomTokenProvider from '../interfaces/providers/IRandomTokenProvider';
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

    @inject('RandomTokenService')
    private _randomTokenService: IRandomTokenProvider,
  ) {}

  async execute({
    email,
  }: IRecoveryPasswordServiceRequest): Promise<
    IRecoveryPasswordServiceResponse
  > {
    const user = await this._usersRepository.findUserByEmail(email);
    if (!user) throw new UserNotFoundException();

    const token = await this._randomTokenService.generate();

    // gravar no banco de dados - Repositório do Token + tabelas/migrations
    // enviar por email - TransactionalEmailProvider

    return {} as IRecoveryPasswordServiceResponse;
  }
}

export default RecoveryPasswordService;
