export interface IUpdateWorkspaceServiceRequest {
  userId: string;
  workspaceId: string;
  name: string;
  url: string;
}

export interface IUpdateWorkspaceServiceResponse {
  workspaceId: string;
  name: string;
  url: string;
}

interface IUpdateWorkspaceService {
  execute: (
    request: IUpdateWorkspaceServiceRequest,
  ) => Promise<IUpdateWorkspaceServiceResponse>;
}

export default IUpdateWorkspaceService;
