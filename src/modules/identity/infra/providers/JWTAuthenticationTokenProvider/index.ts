import { sign, verify, decode, TokenExpiredError } from 'jsonwebtoken';
import config from '@config/identity';

import User from '@modules/identity/domain/entities/User';
import IAuthenticationTokenProvider, {
  IAuthenticationTokenPayload,
} from '@modules/identity/domain/interfaces/providers/IAuthenticationTokenProvider';
import Workspace from '@modules/identity/domain/entities/Workspace';
import IUsersRepository from '@modules/identity/domain/interfaces/repositories/IUsersRepository';
import { container } from 'tsyringe';
import UserNotFoundException from '@modules/identity/domain/errors/UserNotFoundException';
import AuthenticationSessionExpiredException from '@modules/identity/domain/errors/AuthenticationSessionExpiredException';
import InvalidAuthenticationTokenException from '@modules/identity/domain/errors/InvalidAuthenticationTokenException';

class JWTAuthenticationTokenProvider implements IAuthenticationTokenProvider {
  async verify(token: string): Promise<IAuthenticationTokenPayload> {
    try {
      const tokenPayload: IAuthenticationTokenPayload = verify(
        token,
        config.authTokenKey,
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

    const usersRepository: IUsersRepository = container.resolve<
      IUsersRepository
    >('UsersRepository');

    const user = await usersRepository.findById(
      tokenPayloadWithoutValidations.sub,
    );

    if (!user) throw new UserNotFoundException('User not found');

    try {
      const tokenPayload = verify(
        token,
        `${config.authRefreshTokenKey}-${user.password}`,
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

    const token = sign(payload, config.authTokenKey, {
      expiresIn: config.authTokenExpiresIn,
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
      `${config.authRefreshTokenKey}-${user.password}`,
      {
        expiresIn: config.authRefreshTokenExpiresIn,
      },
    );
    return token;
  }
}

export default JWTAuthenticationTokenProvider;
