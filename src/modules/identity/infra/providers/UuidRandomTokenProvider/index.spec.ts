import UuidRandomTokenProvider from '.';

// import { v4 as uuidv4 } from 'uuid';
jest.mock('uuid', () => ({
  v4: async (): Promise<string> => `random-uuid-${Math.random() * 1000}`,
}));

describe('UuidRandomTokenProvider', () => {
  it('should generate a valid string', async () => {
    const uuidRandomTokenProvider = new UuidRandomTokenProvider();
    const generatedToken = await uuidRandomTokenProvider.generate();

    expect(generatedToken).toBeTruthy();
    expect(generatedToken).not.toEqual('');
  });
});
