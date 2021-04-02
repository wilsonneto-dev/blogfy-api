import { sign } from 'jsonwebtoken';

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

    const token = sign(payload, 'secret-key', { expiresIn: '10m' });
    return token;
  }

  generateRefreshToken(user: User, workspace: Workspace): string {
    const payload = <IAuthenticationTokenPayload>{
      sub: user.id,
      workspaceId: workspace.id,
    };

    const token = sign(payload, `secret-key-referesh-${user.password}`, {
      expiresIn: '15d',
    });
    return token;
  }
}

export default JWTAuthenticationTokenProvider;
