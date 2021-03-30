import IWorkspaceRepository from "@modules/identity/domain/interfaces/repositories/IWorkspaceRepository";
import Workspace from "@modules/identity/domain/entities/Workspace";

class FakeWorkspaceRepository implements IWorkspaceRepository {
  private base: Array<Workspace> = [];

  async create(WorkspaceData: Pick<Workspace, "name" | "url">): 
    Promise<Workspace> 
  {
    let newWorkspace: Workspace = new Workspace();
    const id = `${Math.floor(Math.random() * 1000)}`;

    newWorkspace = { ...newWorkspace, ...WorkspaceData, ...{ id } }

    this.base.push(newWorkspace);
    return newWorkspace;
  }

  async findWorkspaceByURL(url: string): Promise<Workspace | null> {
    return this.base.find(Workspace => Workspace.url === url) || null;
  }
}

export default FakeWorkspaceRepository;