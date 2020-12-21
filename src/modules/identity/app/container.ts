import { container } from 'tsyringe';
import BcryptPasswordHashProvider from '../infra/providers/BcryptPasswordHashProvider';
import IPasswordHashProvider from '../domain/interfaces/providers/IPasswordHashProvider';

container.register<IPasswordHashProvider>(
  'PasswordHashProvider',
  BcryptPasswordHashProvider,
);
