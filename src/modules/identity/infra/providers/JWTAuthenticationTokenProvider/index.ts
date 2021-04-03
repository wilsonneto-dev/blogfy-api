import { sign } from 'jsonwebtoken';
import config from '@config/identity';

import User from '@modules/identity/domain/entities/User';
import IAuthenticationTokenProvider, {
  IAuthenticationTokenPayload,
} from '@modules/identity/domain/interfaces/providers/IAuthenticationTokenProvider';
import Workspace from '@modules/identity/domain/entities/Workspace';

class JWTAuthenticationTokenProvider implements IAuthenticationTokenProvider {
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
