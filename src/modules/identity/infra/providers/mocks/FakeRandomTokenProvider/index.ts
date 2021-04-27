import IRandomTokenProvider from '@modules/identity/domain/interfaces/providers/IRandomTokenProvider';

class FakeRandomTokenProvider implements IRandomTokenProvider {
  async generate(): Promise<string> {
    return new Date().toString();
  }
}

export default FakeRandomTokenProvider;
