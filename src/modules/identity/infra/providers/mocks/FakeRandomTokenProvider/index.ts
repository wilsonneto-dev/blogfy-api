import IRandomTokenProvider from '@modules/identity/domain/interfaces/providers/IRandomTokenProvider';

class FakeRandomTokenProvider implements IRandomTokenProvider {
  async generate(): Promise<string> {
    return `${Math.random() * 1000}-${Math.random() * 1000}-${
      Math.random() * 1000
    }-${Math.random() * 1000}`;
  }
}

export default FakeRandomTokenProvider;
