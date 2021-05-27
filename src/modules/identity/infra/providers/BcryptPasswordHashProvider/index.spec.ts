import BcryptPasswordHashProvider from '.';

const stringToBeHashed = 'password';

describe('BcryptPasswordHashProvider', () => {
  it('should generate a not empty string different from the origin string', async () => {
    const bcryptPasswordHashProvider = new BcryptPasswordHashProvider();
    const hashedString = await bcryptPasswordHashProvider.hash(
      stringToBeHashed,
    );

    expect(hashedString).not.toEqual(stringToBeHashed);
    expect(hashedString).toBeTruthy();
    expect(hashedString.length).not.toEqual(0);
  });

  it('should compare correctly the strings', async () => {
    const bcryptPasswordHashProvider = new BcryptPasswordHashProvider();
    const hashedString = await bcryptPasswordHashProvider.hash(
      stringToBeHashed,
    );

    expect(
      await bcryptPasswordHashProvider.compare(stringToBeHashed, hashedString),
    ).toEqual(true);

    expect(
      await bcryptPasswordHashProvider.compare(
        stringToBeHashed,
        `-${hashedString}`,
      ),
    ).toEqual(false);

    expect(
      await bcryptPasswordHashProvider.compare(
        stringToBeHashed,
        `${hashedString}-`,
      ),
    ).toEqual(false);

    expect(
      await bcryptPasswordHashProvider.compare(
        `-${stringToBeHashed}`,
        hashedString,
      ),
    ).toEqual(false);

    expect(
      await bcryptPasswordHashProvider.compare(
        `${stringToBeHashed}-`,
        hashedString,
      ),
    ).toEqual(false);
  });
});
