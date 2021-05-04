export interface IRecoveryPasswordTokenDTO {
  userId: string;
  token: string;
}

interface IRecoveryPasswordTokenRepository {
  create: (dto: IRecoveryPasswordTokenDTO) => Promise<void>;
  findByToken: (token: string) => Promise<IRecoveryPasswordTokenDTO | null>;
  deleteByUserId: (userId: string) => Promise<void>;
}

export default IRecoveryPasswordTokenRepository;
