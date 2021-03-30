import Workspace from '@modules/identity/domain/entities/Workspace';

interface IWorkspacesRepository {
  create(WorkspaceData: Pick<Workspace, 'name' | 'url'>): Promise<Workspace>;
  findWorkspaceByURL(url: string): Promise<Workspace | null>;
}

export default IWorkspacesRepository;
