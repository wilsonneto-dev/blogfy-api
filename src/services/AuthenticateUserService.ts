import { compare, hash } from 'bcryptjs';
import User from 'models/User';
import { getRepository } from 'typeorm';

interface IRequest {
  email: string;
  password: string;
}

class AutenticateUserService {
  public async execute({ email, password }: IRequest): Promise<User | null> {
    const userRepository = getRepository(User);

    const userByEmail = await userRepository.findOne({ email });
    if (!userByEmail) return null;

    const passMatched = await compare(password, userByEmail.password ?? '');
    if (!passMatched) return null;

    return userByEmail;
  }
}

export default AutenticateUserService;
