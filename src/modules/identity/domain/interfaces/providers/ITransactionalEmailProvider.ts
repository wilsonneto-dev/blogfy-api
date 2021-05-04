import DeliveryEmailStatus from '../../enums/DeliveryEmailStatus';

export interface ISendRecoveryPasswordEmailResult {
  deliveryEmailStatus: DeliveryEmailStatus;
}

export interface ISendRecoveryPasswordEmailRequest {
  userName: string;
  userEmail: string;
  linkToRecoveryPassword: string;
}

interface ITransactionalEmailProvider {
  sendRecoveryPasswordEmail: (
    request: ISendRecoveryPasswordEmailRequest,
  ) => Promise<ISendRecoveryPasswordEmailResult>;
}

export default ITransactionalEmailProvider;
