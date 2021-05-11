import { getRepository, Repository } from 'typeorm';

import IRecoveryPasswordTokensRepository, {
  IRecoveryPasswordTokenDTO,
} from '@modules/identity/domain/interfaces/repositories/IRecoveryPasswordTokenRepository';
import RecoveryPasswordToken from '../schemas/RecoveryPasswordToken';

class RecoveryPasswordTokensRepository
  implements IRecoveryPasswordTokensRepository {
  private _ormRepository: Repository<IRecoveryPasswordTokenDTO>;

  constructor() {
    this._ormRepository = getRepository<IRecoveryPasswordTokenDTO>(
      RecoveryPasswordToken,
    );
  }

  public async create(tokenDTO: IRecoveryPasswordTokenDTO): Promise<void> {
    const savedToken = this._ormRepository.create(tokenDTO);
    await this._ormRepository.save(savedToken);
  }

  public async findByToken(
    token: string,
  ): Promise<IRecoveryPasswordTokenDTO | null> {
    const matchedToken = await this._ormRepository.findOne({ token });
    return matchedToken || null;
  }

  public async deleteByUserId(userId: string): Promise<void> {
    await this._ormRepository.delete({ userId });
  }
}

export default RecoveryPasswordTokensRepository;
