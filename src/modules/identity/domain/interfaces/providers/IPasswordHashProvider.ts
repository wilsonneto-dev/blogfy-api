interface IPasswordHashProvider {
  hash(password: string): Promise<string>;
  compare(password: string, passwordToCompare: string): Promise<boolean>;
}

export default IPasswordHashProvider;
