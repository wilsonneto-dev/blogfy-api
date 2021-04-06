/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { inject, injectable } from 'tsyringe';

import IAuthenticateUserService, {
  IAuthenticateUserServiceRequest,
  IAuthenticateUserServiceResponse,
} from '@modules/identity/domain/interfaces/services/IAuthenticateUserService';
import IUsersRepository from '@modules/identity/domain/interfaces/repositories/IUsersRepository';
import IHashProvider from '@modules/identity/domain/interfaces/providers/IHashProvider';
import IAuthenticationTokenProvider from '../interfaces/providers/IAuthenticationTokenProvider';
import AuthenticationFailedException from '../errors/AuthenticationFailedException';

@injectable()
class AuthenticateUserService implements IAuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private _usersRepository: IUsersRepository,

    @inject('HashProvider')
    private _hashProvider: IHashProvider,

    @inject('AuthenticationTokenProvider')
    private _authTokenProvider: IAuthenticationTokenProvider,
  ) {}

  async execute({
    email,
    password,
  }: IAuthenticateUserServiceRequest): Promise<
    IAuthenticateUserServiceResponse
  > {
    const user = await this._usersRepository.findUserByEmail(email);
    if (user === null)
      throw new AuthenticationFailedException('Invalid credentials');

    const passwordMatched = await this._hashProvider.compare(
      password,
      user.password!,
    );
    if (passwordMatched === false)
      throw new AuthenticationFailedException('Invalid credentials');

    const defaultWorkspace = user.workspaces![0];

    const token = this._authTokenProvider.generate(user, defaultWorkspace);
    const refreshToken = this._authTokenProvider.generateRefreshToken(
      user,
      defaultWorkspace,
    );

    return {
      id: user.id!,
      email: user.email,
      name: user.name,

      workspace: defaultWorkspace.name,
      workspaceId: defaultWorkspace.id!,

      token,
      refreshToken,
    };
  }
}

export default AuthenticateUserService;
