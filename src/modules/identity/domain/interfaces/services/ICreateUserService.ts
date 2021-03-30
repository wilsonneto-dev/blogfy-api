export interface ICreateUserServiceRequest {
  name: string;
  email: string;
  password: string;
  workspace: string;
  workspaceURL: string;
}

export interface ICreateUserServiceResponse extends Omit<ICreateUserServiceRequest, 'password'> {
  id: string;
  workspaceId: string;
}

export default interface ICreateUserService {
  execute(request: ICreateUserServiceRequest): Promise<ICreateUserServiceResponse>
}
