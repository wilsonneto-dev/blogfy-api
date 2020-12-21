import IPasswordHashProvider from '@modules/identity/domain/interfaces/providers/IPasswordHashProvider';

class FakePasswordHashProvider implements IPasswordHashProvider {
  public async hash(password: string): Promise<string> {
    return `hash-${password}`;
  }

  public async compare(
    password: string,
    passwordToCompare: string,
  ): Promise<boolean> {
    return password === `hash-${passwordToCompare}`;
  }
}

export default FakePasswordHashProvider;
