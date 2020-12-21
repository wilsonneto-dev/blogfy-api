import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import User from '@modules/identity/domain/entities/User';
import IUsersRepository from '@modules/identity/domain/interfaces/repositories/IUsersRepository';
import IPasswordHashProvider from '../../interfaces/providers/IPasswordHashProvider';

export interface ICreateUserServiceRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('PasswordHashProvider')
    private passwordHashProvider: IPasswordHashProvider,
  ) {}

  public async execute({
    name,
    email,
    password,
  }: ICreateUserServiceRequest): Promise<User> {
    const userByEmail = await this.usersRepository.findUserByEmail(email);
    if (userByEmail) {
      throw new AppError('Este email já possui cadastro', 409);
    }

    const hashedPassword = await this.passwordHashProvider.hash(password);
    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
