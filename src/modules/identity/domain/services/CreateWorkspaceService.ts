import { inject, injectable } from "tsyringe";

import WorkspaceUrlAlreadyExistsException from 
  "@modules/identity/domain/errors/WorkspaceUrlAlreadyExistsException";
import IWorkspaceRepository from 
  "@modules/identity/domain/interfaces/repositories/IWorkspaceRepository";
import ICreateWorkspace, 
  { ICreateWorkspaceServiceRequest, 
    ICreateWorkspaceServiceResponse } 
  from "@modules/identity/domain/interfaces/services/ICreateWorkspaceService";

@injectable()
class CreateWorkspaceService implements ICreateWorkspace {
  constructor(
    @inject('WorkspacesRepository') private _workspaceRepository: IWorkspaceRepository,
  ) { }

  async execute({ name, url }: ICreateWorkspaceServiceRequest): 
    Promise<ICreateWorkspaceServiceResponse> 
  {
    console.log('before: this._workspaceRepository');
    const workspaceWithSameURL = await this._workspaceRepository.findWorkspaceByURL(url);
    if(workspaceWithSameURL)
      throw new WorkspaceUrlAlreadyExistsException('Workspace already exists');

    console.log('after: this._workspaceRepository');
    const createdWorkspace = await this._workspaceRepository.create({ name, url })
    return {
      id: createdWorkspace.id,
      name: createdWorkspace.name,
      url: createdWorkspace.url
    };
  }
}

export default CreateWorkspaceService;
