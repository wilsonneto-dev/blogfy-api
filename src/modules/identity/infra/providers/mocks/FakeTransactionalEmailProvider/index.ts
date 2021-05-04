import DeliveryEmailStatus from '@modules/identity/domain/enums/DeliveryEmailStatus';
import ITransactionalEmailProvider, {
  ISendRecoveryPasswordEmailRequest,
  ISendRecoveryPasswordEmailResult,
} from '@modules/identity/domain/interfaces/providers/ITransactionalEmailProvider';

class FakeTransactionalEmailProvider implements ITransactionalEmailProvider {
  async sendRecoveryPasswordEmail(
    request: ISendRecoveryPasswordEmailRequest,
  ): Promise<ISendRecoveryPasswordEmailResult> {
    // eslint-disable-next-line no-console
    console.log(request);

    return { deliveryEmailStatus: DeliveryEmailStatus.Enqued };
  }
}

export default FakeTransactionalEmailProvider;
