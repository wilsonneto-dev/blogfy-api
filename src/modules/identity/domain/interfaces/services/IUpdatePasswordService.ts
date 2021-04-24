export interface IUpdatePasswordServiceRequest {
  userId: string;
  newPassword: string;
  currentPassword: string;
}

export interface IUpdatePasswordServiceResponse {
  success: boolean;
}

interface IUpdatePasswordService {
  execute: (
    request: IUpdatePasswordServiceRequest,
  ) => Promise<IUpdatePasswordServiceResponse>;
}

export default IUpdatePasswordService;
