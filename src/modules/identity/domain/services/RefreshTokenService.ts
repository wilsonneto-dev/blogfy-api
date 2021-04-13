import { inject, injectable } from 'tsyringe';

import InvalidAuthenticationTokenException from '../errors/InvalidAuthenticationTokenException';
import UserNotFoundException from '../errors/UserNotFoundException';
import UserWithoutPermissionsException from '../errors/UserWithoutPermissionsException';
import IAuthenticationTokenProvider from '../interfaces/providers/IAuthenticationTokenProvider';
import IUsersRepository from '../interfaces/repositories/IUsersRepository';
import IRefreshTokenService, {
  IRefreshTokenServiceRequest,
  IRefreshTokenServiceResponse,
} from '../interfaces/services/IRefreshTokenService';

@injectable()
class RefreshTokenService implements IRefreshTokenService {
  constructor(
    @inject('UsersRepository')
    private _usersRepository: IUsersRepository,

    @inject('AuthenticationTokenProvider')
    private _authenticationTokenProvider: IAuthenticationTokenProvider,
  ) {}

  async execute({
    refreshToken,
  }: IRefreshTokenServiceRequest): Promise<IRefreshTokenServiceResponse> {
    const tokenPayload = await this._authenticationTokenProvider.verifyRefreshToken(
      refreshToken,
    );
    if (!tokenPayload) throw new InvalidAuthenticationTokenException();

    const { sub: userId, workspaceId } = tokenPayload;

    const user = await this._usersRepository.findById(userId);
    if (!user) throw new UserNotFoundException();

    const workspaceFromUser = user.workspaces!.find(
      workspace => workspace.id === workspaceId,
    );
    if (!workspaceFromUser) throw new UserWithoutPermissionsException();

    const newToken = this._authenticationTokenProvider.generate(
      user,
      workspaceFromUser,
    );

    const newRefreshToken = this._authenticationTokenProvider.generateRefreshToken(
      user,
      workspaceFromUser,
    );

    return {
      token: newToken,
      refreshToken: newRefreshToken,
    } as IRefreshTokenServiceResponse;
  }
}

export default RefreshTokenService;
