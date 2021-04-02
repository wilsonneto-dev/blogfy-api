import User from '@modules/identity/domain/entities/User';
import Workspace from '@modules/identity/domain/entities/Workspace';
import IAuthenticationTokenProvider from '@modules/identity/domain/interfaces/providers/IAuthenticationTokenProvider';

class FakeAuthenticationTokenProvider implements IAuthenticationTokenProvider {
  generate(user: User, workspace: Workspace): string {
    return `token-${user.id}-${workspace.id}`;
  }

  generateRefreshToken(user: User, workspace: Workspace): string {
    return `refresh-token-${user.id}-${workspace.id}`;
  }
}

export default FakeAuthenticationTokenProvider;
