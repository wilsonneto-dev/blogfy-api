import { inject, injectable } from 'tsyringe';
import UserNotFoundException from '../errors/UserNotFoundException';
import UserWithoutPermissionsException from '../errors/UserWithoutPermissionsException';
import IUsersRepository from '../interfaces/repositories/IUsersRepository';
import IGetUserInfoService, {
  IGetUserInfoServiceRequest,
  IGetUserInfoServiceResponse,
} from '../interfaces/services/IGetUserInfoService';

@injectable()
class GetUserInfoService implements IGetUserInfoService {
  constructor(
    @inject('UsersRepository') private _usersRepository: IUsersRepository,
  ) {}

  async execute({
    userId,
    workspaceId,
  }: IGetUserInfoServiceRequest): Promise<IGetUserInfoServiceResponse> {
    console.log('service...');

    const user = await this._usersRepository.findById(userId);

    console.log('user...', user);

    if (!user) throw new UserNotFoundException('User not found');

    const workspace = user.workspaces!.find(
      workspaceItem => workspaceItem.id === workspaceId,
    );

    if (!workspace)
      throw new UserWithoutPermissionsException(
        'User without permissions in this workspace',
      );

    const response: IGetUserInfoServiceResponse = {
      id: user.id!,
      email: user.email,
      name: user.name,
      workspace: workspace.name,
      workspaceId: workspace.id!,
    };

    return response;
  }
}

export default GetUserInfoService;
