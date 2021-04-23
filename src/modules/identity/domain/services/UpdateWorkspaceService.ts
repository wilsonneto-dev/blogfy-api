import { inject, injectable } from 'tsyringe';
import UserNotFoundException from '../errors/UserNotFoundException';
import UserWithoutPermissionsException from '../errors/UserWithoutPermissionsException';
import WorkspaceUrlAlreadyExistsException from '../errors/WorkspaceUrlAlreadyExistsException';
import IUsersRepository from '../interfaces/repositories/IUsersRepository';
import IWorkspacesRepository from '../interfaces/repositories/IWorkspaceRepository';
import IUpdateWorkspaceService, {
  IUpdateWorkspaceServiceRequest,
  IUpdateWorkspaceServiceResponse,
} from '../interfaces/services/IUpdateWorkspaceService';

@injectable()
class UpdateWorkspaceService implements IUpdateWorkspaceService {
  constructor(
    @inject('WorkspacesRepository')
    private _workspacesRepository: IWorkspacesRepository,

    @inject('UsersRepository')
    private _usersRepository: IUsersRepository,
  ) {}

  async execute({
    userId,
    workspaceId,
    url,
    name,
  }: IUpdateWorkspaceServiceRequest): Promise<IUpdateWorkspaceServiceResponse> {
    const user = await this._usersRepository.findById(userId);
    if (!user) throw new UserNotFoundException();

    const workspace = user.workspaces!.find(
      _workspace => _workspace.id === workspaceId,
    );
    if (!workspace) throw new UserWithoutPermissionsException();

    if (workspace.url !== url) {
      const workspaceWithSameUrl = await this._workspacesRepository.findWorkspaceByURL(
        url,
      );
      if (workspaceWithSameUrl && workspaceWithSameUrl!.id !== workspace.id)
        throw new WorkspaceUrlAlreadyExistsException();
    }

    workspace.name = name;
    workspace.url = url;

    const updatedWorkspace = await this._workspacesRepository.update(workspace);

    const serviceResponse: IUpdateWorkspaceServiceResponse = {
      workspaceId: updatedWorkspace.id!,
      name: updatedWorkspace.name,
      url: updatedWorkspace.url,
    };

    return serviceResponse;
  }
}

export default UpdateWorkspaceService;
