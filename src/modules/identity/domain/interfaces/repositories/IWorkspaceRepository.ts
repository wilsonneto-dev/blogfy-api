import Workspace from '@modules/identity/domain/entities/Workspace';

interface IWorkspacesRepository {
  create(workspace: Workspace): Promise<Workspace>;
  findWorkspaceByURL(url: string): Promise<Workspace | null>;
}

export default IWorkspacesRepository;
