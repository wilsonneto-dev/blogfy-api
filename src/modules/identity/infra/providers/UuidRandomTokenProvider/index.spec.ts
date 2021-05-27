import UuidRandomTokenProvider from '.';

describe('UuidRandomTokenProvider', () => {
  it('should generate a valid string', async () => {
    const uuidRandomTokenProvider = new UuidRandomTokenProvider();
    const generatedToken = await uuidRandomTokenProvider.generate();

    expect(generatedToken).toBeTruthy();
    expect(generatedToken).not.toEqual('');
  });
});
