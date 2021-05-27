import IWorkspaceRepository from '@modules/identity/domain/interfaces/repositories/IWorkspaceRepository';
import Workspace from '@modules/identity/domain/entities/Workspace';

class FakeWorkspacesRepository implements IWorkspaceRepository {
  private base: Array<Workspace> = [];

  async create(
    WorkspaceData: Pick<Workspace, 'name' | 'url'>,
  ): Promise<Workspace> {
    let newWorkspace: Workspace = new Workspace();
    const id = `${Math.floor(Math.random() * 1000)}`;

    newWorkspace = { ...newWorkspace, ...WorkspaceData, ...{ id } };

    this.base.push(newWorkspace);
    return newWorkspace;
  }

  async update(workspace: Workspace): Promise<Workspace> {
    const itemInMemoryIndex = this.base.findIndex(
      _workspace => _workspace.id === workspace.id,
    );

    if (itemInMemoryIndex === -1) this.base.push(workspace);
    else this.base[itemInMemoryIndex] = workspace;

    return this.base[itemInMemoryIndex];
  }

  async findWorkspaceByURL(url: string): Promise<Workspace | null> {
    return this.base.find(_workspace => _workspace.url === url) || null;
  }
}

export default FakeWorkspacesRepository;
