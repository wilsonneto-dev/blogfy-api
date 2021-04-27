import { v4 as uuidv4 } from 'uuid';
import IRandomTokenProvider from '@modules/identity/domain/interfaces/providers/IRandomTokenProvider';

class UuidRandomTokenProvider implements IRandomTokenProvider {
  async generate(): Promise<string> {
    return uuidv4();
  }
}

export default UuidRandomTokenProvider;
