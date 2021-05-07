export interface IRecoveryPasswordChangeServiceRequest {
  email: string;
  token: string;
  newPasword: string;
}

export interface IRecoveryPasswordChangeServiceResponse {
  success: boolean;
}

interface IRecoveryPasswordChangeService {
  execute: (
    request: IRecoveryPasswordChangeServiceRequest,
  ) => Promise<IRecoveryPasswordChangeServiceResponse>;
}

export default IRecoveryPasswordChangeService;
