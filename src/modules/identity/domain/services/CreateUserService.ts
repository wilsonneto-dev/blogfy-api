import { inject, injectable } from 'tsyringe';
import { hash } from 'bcryptjs';

import AppError from '@shared/errors/AppError';

import User from '@modules/identity/domain/entities/User';
import IUsersRepository from '@modules/identity/domain/interfaces/repositories/IUsersRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const userByEmail = await this.usersRepository.findUserByEmail(email);
    if (userByEmail) {
      throw new AppError('Este email já possui cadastro', 409);
    }

    const hashedPassword = await hash(password, 8);
    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
