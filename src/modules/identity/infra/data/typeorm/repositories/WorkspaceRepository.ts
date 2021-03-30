import { getRepository, Repository } from 'typeorm';

import Workspace from '@modules/identity/domain/entities/Workspace';
import IWorkspacesRepository from '@modules/identity/domain/interfaces/repositories/IWorkspaceRepository';
import WorkspaceSchema from '../schemas/WorkspaceSchema';

class WorkspacesRepository implements IWorkspacesRepository {
  private ormRepository: Repository<Workspace>;

  constructor() {
    this.ormRepository = getRepository<Workspace>(WorkspaceSchema);
  }

  async findWorkspaceByURL(url: string): Promise<Workspace | null> {
    const workspace = await this.ormRepository.findOne({ url });
    return workspace || null;
  }

  public async create(
    { name, url }: Required<Pick<Workspace, 'name' | 'url'>>
  ): Promise<Workspace> {
    const workspace = this.ormRepository.create({ name, url });
    await this.ormRepository.save(workspace);
    return workspace;
  }
}

export default WorkspacesRepository;
