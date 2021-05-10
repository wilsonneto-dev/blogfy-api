import Workspace from '@modules/identity/domain/entities/Workspace';
import IWorkspacesRepository from '@modules/identity/domain/interfaces/repositories/IWorkspaceRepository';
import IMongooseModelMapper from '../mappers/interface/IMongooseModelMapper';
import WorkspaceModelMapper from '../mappers/WorkspaceModelMapper';
import WorkspaceModel from '../models/WorkspaceModel';

class WorkspacesRepository implements IWorkspacesRepository {
  private _workspaceModelMapper: IMongooseModelMapper<Workspace>;
  constructor() {
    this._workspaceModelMapper = new WorkspaceModelMapper();
  }

  async create(workspace: Workspace): Promise<Workspace> {
    const model = this._workspaceModelMapper.fromDomainEntity(workspace);
    await model.save();
    return this._workspaceModelMapper.toDomainEntity(model);
  }

  async update(workspace: Workspace): Promise<Workspace> {
    const model = this._workspaceModelMapper.fromDomainEntity(workspace);
    await model.save();
    return this._workspaceModelMapper.toDomainEntity(model);
  }

  async findWorkspaceByURL(url: string): Promise<Workspace | null> {
    const model = await WorkspaceModel.findOne({ url });
    if (!model) return null;
    return this._workspaceModelMapper.toDomainEntity(model);
  }
}

export default WorkspacesRepository;
