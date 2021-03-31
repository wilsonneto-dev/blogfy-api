/*
import { compare } from 'bcryptjs';
import { getRepository } from 'typeorm';
import { sign } from 'jsonwebtoken';

import AppError from '@shared/errors/AppError';
import config from '@config/auth';

import User from '@modules/identity/domain/entities/User';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: Pick<User, 'id' | 'name'>;
  token: string;
}

class AutenticateUserService {
  public async execute({
    email,
    password,
  }: IRequest): Promise<IResponse | null> {
    const userRepository = getRepository(User);

    const userByEmail = await userRepository.findOne({ email });
    if (!userByEmail) throw new AppError('Incorrect credentials', 401);

    const passMatched = await compare(password, userByEmail.password ?? '');
    if (!passMatched) throw new AppError('Incorrect credentials', 401);

    const token = sign(
      {
        subject: userByEmail.id,
        expiresIn: config.jwt.expiresIn,
        name: userByEmail.name,
      },
      config.jwt.secret,
    );

    return { user: { id: userByEmail.id, name: userByEmail.name }, token };
  }
}

export default AutenticateUserService;
*/