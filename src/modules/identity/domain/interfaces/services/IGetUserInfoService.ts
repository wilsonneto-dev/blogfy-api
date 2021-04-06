export interface IGetUserInfoServiceRequest {
  userId: string;
  workspaceId: string;
}

export interface IGetUserInfoServiceResponse {
  id: string;
  name: string;
  email: string;

  workspaceId: string;
  workspace: string;
}

interface IGetUserInfoService {
  execute: (
    request: IGetUserInfoServiceRequest,
  ) => Promise<IGetUserInfoServiceResponse>;
}

export default IGetUserInfoService;
