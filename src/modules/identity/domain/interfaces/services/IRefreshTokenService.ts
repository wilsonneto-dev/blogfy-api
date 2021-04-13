export interface IRefreshTokenServiceRequest {
  refreshToken: string;
}

export interface IRefreshTokenServiceResponse {
  token: string;
  refreshToken: string;
}

interface IRefreshTokenService {
  execute: (
    request: IRefreshTokenServiceRequest,
  ) => Promise<IRefreshTokenServiceResponse>;
}

export default IRefreshTokenService;
