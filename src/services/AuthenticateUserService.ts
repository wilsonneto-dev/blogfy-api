import { compare, hash } from 'bcryptjs';
import { getRepository } from 'typeorm';
import { sign } from 'jsonwebtoken';

import User from '../models/User';
import AppError from '../errors/AppError';

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
        expiresIn: '1d',
        name: userByEmail.name,
      },
      'secret-kei-123654',
    );

    return { user: { id: userByEmail.id, name: userByEmail.name }, token };
  }
}

export default AutenticateUserService;
