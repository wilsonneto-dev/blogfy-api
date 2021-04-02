import User from '../../entities/User';
import Workspace from '../../entities/Workspace';

export interface IAuthenticationTokenPayload {
  sub: string;
  workspaceId: string;
}

interface IAuthenticationTokenProvider {
  generate: (user: User, workspace: Workspace) => string;
  generateRefreshToken: (user: User, workspace: Workspace) => string;
}

export default IAuthenticationTokenProvider;
