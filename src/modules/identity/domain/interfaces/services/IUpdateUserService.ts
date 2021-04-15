export interface IUpdateUserServiceRequest {
  userId: string;
  name: string;
  email: string;
}

export interface IUpdateUserServiceResponse {
  userId: string;
  name: string;
  email: string;
}

interface IUpdateUserService {
  execute: (
    request: IUpdateUserServiceRequest,
  ) => Promise<IUpdateUserServiceResponse>;
}

export default IUpdateUserService;
