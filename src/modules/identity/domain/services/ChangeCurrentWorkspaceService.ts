import { inject, injectable } from 'tsyringe';
import UserNotFoundException from '../errors/UserNotFoundException';
import UserWithoutPermissionsException from '../errors/UserWithoutPermissionsException';
import IAuthenticationTokenProvider from '../interfaces/providers/IAuthenticationTokenProvider';
import IUsersRepository from '../interfaces/repositories/IUsersRepository';
import IChangeCurrentWorkspaceService, {
  IChangeCurrentWorkspaceServiceRequest,
  IChangeCurrentWorkspaceServiceResponse,
} from '../interfaces/services/IChangeCurrentWorkspaceService';

@injectable()
class ChangeCurrentWorkspaceService implements IChangeCurrentWorkspaceService {
  constructor(
    @inject('UsersRepository')
    private _usersRepository: IUsersRepository,

    @inject('AuthenticationTokenProvider')
    private _authenticationTokenProvider: IAuthenticationTokenProvider,
  ) {}

  async execute({
    userId,
    targetWorkspaceId,
  }: IChangeCurrentWorkspaceServiceRequest): Promise<
    IChangeCurrentWorkspaceServiceResponse
  > {
    const user = await this._usersRepository.findById(userId);
    if (!user) throw new UserNotFoundException('User not found');

    const workspace = user.workspaces!.find(
      _workspace => _workspace.id === targetWorkspaceId,
    );
    if (!workspace)
      throw new UserWithoutPermissionsException('User without permission');

    const token = this._authenticationTokenProvider.generate(user, workspace);
    const refreshToken = this._authenticationTokenProvider.generateRefreshToken(
      user,
      workspace,
    );

    const response: IChangeCurrentWorkspaceServiceResponse = {
      workspace: workspace.name,
      workspaceId: workspace.id!,

      token,
      refreshToken,
    };

    return response;
  }
}

export default ChangeCurrentWorkspaceService;
