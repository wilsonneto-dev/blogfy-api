import IPasswordHashProvider from '@modules/identity/domain/interfaces/providers/IPasswordHashProvider';
import { hash, compare } from 'bcryptjs';

class BcryptPasswordHashProvider implements IPasswordHashProvider {
  public async hash(password: string): Promise<string> {
    return hash(password, 8);
  }

  public async compare(
    password: string,
    passwordToCompare: string,
  ): Promise<boolean> {
    return compare(password, passwordToCompare);
  }
}

export default BcryptPasswordHashProvider;
