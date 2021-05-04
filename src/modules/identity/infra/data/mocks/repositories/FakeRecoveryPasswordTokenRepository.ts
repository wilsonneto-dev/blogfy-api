import IRecoveryPasswordTokenRepository, {
  IRecoveryPasswordTokenDTO,
} from '@modules/identity/domain/interfaces/repositories/IRecoveryPasswordTokenRepository';

class FakeRecoveryPasswordTokenRepository
  implements IRecoveryPasswordTokenRepository {
  private _base: Array<IRecoveryPasswordTokenDTO> = [];

  async create(dto: IRecoveryPasswordTokenDTO): Promise<void> {
    this._base.push(dto);
  }

  async findByToken(token: string): Promise<IRecoveryPasswordTokenDTO | null> {
    const matchTocken =
      this._base.find(_token => _token.token === token) || null;

    return matchTocken;
  }

  async deleteByUserId(userId: string): Promise<void> {
    this._base = this._base.filter(token => token.userId !== userId);
  }
}

export default FakeRecoveryPasswordTokenRepository;
