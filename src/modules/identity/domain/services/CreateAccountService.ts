import { inject, injectable } from 'tsyringe';

import ICreateAccountService, {
  ICreateAccountServiceRequest,
  ICreateAccountServiceResponse,
} from '@modules/identity/domain/interfaces/services/ICreateAccountService';
import IUsersRepository from '@modules/identity/domain/interfaces/repositories/IUsersRepository';
import IWorkspacesRepository from '@modules/identity/domain/interfaces/repositories/IWorkspaceRepository';
import EmailAlreadyExistsException from '@modules/identity/domain/errors/EmailAlreadyExistsException';
import WorkspaceUrlAlreadyExistsException from '@modules/identity/domain/errors/WorkspaceUrlAlreadyExistsException';
import User from '../entities/User';
import Workspace from '../entities/Workspace';

@injectable()
class CreateAcoountService implements ICreateAccountService {
  constructor(
    @inject('UsersRepository') private _usersRepository: IUsersRepository,
    @inject('WorkspacesRepository')
    private _workspacesRepository: IWorkspacesRepository,
  ) {}

  async execute({
    name,
    email,
    password,
    workspaceURL,
    workspace,
  }: ICreateAccountServiceRequest): Promise<ICreateAccountServiceResponse> {
    const userWithSameEmail = await this._usersRepository.findUserByEmail(
      email,
    );

    if (userWithSameEmail)
      throw new EmailAlreadyExistsException(
        'Email already exists in the database',
      );

    const workspaceWithSameURL = await this._workspacesRepository.findWorkspaceByURL(
      workspaceURL,
    );
    if (workspaceWithSameURL)
      throw new WorkspaceUrlAlreadyExistsException(
        'Workspace URL already exists in the database',
      );

    const userToSave = <User>{ name, email, password };
    const workspaceToSave = <Workspace>{
      name: workspace,
      url: workspaceURL,
    };

    const savedWorkspace = await this._workspacesRepository.create(
      workspaceToSave,
    );
    const savedUser = await this._usersRepository.create(userToSave);

    return {
      userId: savedUser.id!,
      name: savedUser.name,
      email: savedUser.email,

      workspaceId: savedWorkspace.id!,
      workspace: savedWorkspace.name,
      workspaceURL: savedWorkspace.url,
    };
  }
}

export default CreateAcoountService;
