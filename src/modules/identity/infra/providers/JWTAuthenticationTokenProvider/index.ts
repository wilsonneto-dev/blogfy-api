import { sign, verify, decode, TokenExpiredError } from 'jsonwebtoken';

import User from '@modules/identity/domain/entities/User';
import IAuthenticationTokenProvider, {
  IAuthenticationTokenPayload,
} from '@modules/identity/domain/interfaces/providers/IAuthenticationTokenProvider';
import Workspace from '@modules/identity/domain/entities/Workspace';
import IUsersRepository from '@modules/identity/domain/interfaces/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';
import UserNotFoundException from '@modules/identity/domain/errors/UserNotFoundException';
import AuthenticationSessionExpiredException from '@modules/identity/domain/errors/AuthenticationSessionExpiredException';
import InvalidAuthenticationTokenException from '@modules/identity/domain/errors/InvalidAuthenticationTokenException';
import { IIdentityConfiguration } from '@config/IdentityConfiguration';

@injectable()
class JWTAuthenticationTokenProvider implements IAuthenticationTokenProvider {
  constructor(
    @inject('UsersRepository')
    private _usersRepository: IUsersRepository,

    @inject('IdentityConfiguration')
    private _identityConfiguration: IIdentityConfiguration,
  ) {}

  async verify(token: string): Promise<IAuthenticationTokenPayload> {
    try {
      const tokenPayload: IAuthenticationTokenPayload = verify(
        token,
        this._identityConfiguration.authTokenKey,
      ) as IAuthenticationTokenPayload;

      return tokenPayload;
    } catch (error) {
      if (error instanceof TokenExpiredError)
        throw new AuthenticationSessionExpiredException(
          (error as TokenExpiredError).message,
        );
      else throw error;
    }
  }

  async verifyRefreshToken(
    token: string,
  ): Promise<IAuthenticationTokenPayload> {
    const tokenPayloadWithoutValidations: IAuthenticationTokenPayload = decode(
      token,
    ) as IAuthenticationTokenPayload;

    if (!tokenPayloadWithoutValidations)
      throw new InvalidAuthenticationTokenException();

    const user = await this._usersRepository.findById(
      tokenPayloadWithoutValidations.sub,
    );

    if (!user) throw new UserNotFoundException('User not found');

    try {
      const tokenPayload = verify(
        token,
        `${this._identityConfiguration.authRefreshTokenKey}-${user.password}`,
      ) as IAuthenticationTokenPayload;

      return tokenPayload;
    } catch (error) {
      throw new InvalidAuthenticationTokenException();
    }
  }

  generate(user: User, workspace: Workspace): string {
    const payload = <IAuthenticationTokenPayload>{
      sub: user.id,
      workspaceId: workspace.id,
    };

    const token = sign(payload, this._identityConfiguration.authTokenKey, {
      expiresIn: this._identityConfiguration.authTokenExpiresIn,
    });
    return token;
  }

  generateRefreshToken(user: User, workspace: Workspace): string {
    const payload = <IAuthenticationTokenPayload>{
      sub: user.id,
      workspaceId: workspace.id,
    };

    const token = sign(
      payload,
      `${this._identityConfiguration.authRefreshTokenKey}-${user.password}`,
      {
        expiresIn: this._identityConfiguration.authRefreshTokenExpiresIn,
      },
    );
    return token;
  }
}

export default JWTAuthenticationTokenProvider;
