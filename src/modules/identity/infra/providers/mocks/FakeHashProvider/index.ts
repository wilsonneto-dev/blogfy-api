import IHashProvider from '@modules/identity/domain/interfaces/providers/IHashProvider';

class FakePasswordHashProvider implements IHashProvider {
  public async hash(password: string): Promise<string> {
    return `hash-${password}`;
  }

  public async compare(
    plainTextPassword: string,
    hashedPasswordToCompare: string,
  ): Promise<boolean> {
    return hashedPasswordToCompare === `hash-${plainTextPassword}`;
  }
}

export default FakePasswordHashProvider;
