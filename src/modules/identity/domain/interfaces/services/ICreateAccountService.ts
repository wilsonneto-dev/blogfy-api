export interface ICreateAccountServiceRequest {
  name: string;
  email: string;
  password: string;
  workspace: string;
  workspaceURL: string;
}

export interface ICreateAccountServiceResponse {
  userId: string;
  name: string;
  email: string;

  workspaceId: string;
  workspace: string;
  workspaceURL: string;
}

export default interface ICreateAccountService {
  execute: (
    request: ICreateAccountServiceRequest,
  ) => Promise<ICreateAccountServiceResponse>;
}
