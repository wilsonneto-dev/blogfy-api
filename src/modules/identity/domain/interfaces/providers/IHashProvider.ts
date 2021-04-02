interface IHashProvider {
  hash(password: string): Promise<string>;
  compare(
    plainTextPassword: string,
    hashedPasswordToCompare: string,
  ): Promise<boolean>;
}

export default IHashProvider;
