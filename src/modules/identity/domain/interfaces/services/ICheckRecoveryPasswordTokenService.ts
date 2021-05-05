export interface ICheckRecoveryPasswordTokenServiceRequest {
  email: string;
  token: string;
}

export interface ICheckRecoveryPasswordTokenServiceResponse {
  valid: boolean;
}

interface ICheckRecoveryPasswordTokenService {
  execute: (
    request: ICheckRecoveryPasswordTokenServiceRequest,
  ) => Promise<ICheckRecoveryPasswordTokenServiceResponse>;
}

export default ICheckRecoveryPasswordTokenService;
