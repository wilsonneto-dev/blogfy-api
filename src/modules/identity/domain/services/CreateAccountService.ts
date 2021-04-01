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
import IHashProvider from '../interfaces/providers/IHashProvider';

@injectable()
class CreateAcoountService implements ICreateAccountService {
  constructor(
    @inject('UsersRepository')
    private _usersRepository: IUsersRepository,

    @inject('WorkspacesRepository')
    private _workspacesRepository: IWorkspacesRepository,

    @inject('HashProvider')
    private _hashProvider: IHashProvider,
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

    const hashedPassword = await this._hashProvider.hash(password);
    const userToSave = <User>{ name, email, password: hashedPassword };
    const workspaceToSave = <Workspace>{
      name: workspace,
      url: workspaceURL,
    };

    const savedWorkspace = await this._workspacesRepository.create(
      workspaceToSave,
    );

    userToSave.workspaces = [savedWorkspace];
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
