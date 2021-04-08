export interface IChangeCurrentWorkspaceServiceRequest {
  userId: string;
  targetWorkspaceId: string;
}

export interface IChangeCurrentWorkspaceServiceResponse {
  workspaceId: string;
  workspace: string;

  token: string;
  refreshToken: string;
}

interface IChangeCurrentWorkspaceService {
  execute: (
    request: IChangeCurrentWorkspaceServiceRequest,
  ) => Promise<IChangeCurrentWorkspaceServiceResponse>;
}

export default IChangeCurrentWorkspaceService;
