export interface IAuthenticateUserServiceRequest {
  email: string;
  password: string;
}

export interface IAuthenticateUserServiceResponse {
  id: string;
  name: string;
  email: string;

  workspaceId: string;
  workspace: string;

  token: string;
  refreshToken: string;
}

interface IAuthenticateUserService {
  execute: (
    request: IAuthenticateUserServiceRequest,
  ) => Promise<IAuthenticateUserServiceResponse>;
}

export default IAuthenticateUserService;
