import DeliveryEmailStatus from '../../enums/DeliveryEmailStatus';

export interface IRecoveryPasswordServiceRequest {
  email: string;
}

export interface IRecoveryPasswordServiceResponse {
  success: boolean;
  emailStatus: DeliveryEmailStatus;
}

interface IRecoveryPasswordService {
  execute: (
    request: IRecoveryPasswordServiceRequest,
  ) => Promise<IRecoveryPasswordServiceResponse>;
}

export default IRecoveryPasswordService;
