import User from '@modules/identity/domain/entities/User';
import Workspace from '@modules/identity/domain/entities/Workspace';
import InvalidAuthenticationTokenException from '@modules/identity/domain/errors/InvalidAuthenticationTokenException';
import IAuthenticationTokenProvider, {
  IAuthenticationTokenPayload,
} from '@modules/identity/domain/interfaces/providers/IAuthenticationTokenProvider';

class FakeAuthenticationTokenProvider implements IAuthenticationTokenProvider {
  async verify(token: string): Promise<IAuthenticationTokenPayload> {
    const tokenParts = token.split('-');
    if (tokenParts.length !== 3)
      throw new InvalidAuthenticationTokenException();

    const isValidToken =
      tokenParts[0] === 'token' &&
      tokenParts[1].length > 0 &&
      tokenParts[2].length > 0;

    if (!isValidToken) throw new InvalidAuthenticationTokenException();

    const decodedUserId = tokenParts[1].replace('%2D', '-');
    const decodedWorkspaceId = tokenParts[2].replace('%2D', '-');

    const payload: IAuthenticationTokenPayload = {
      sub: decodedUserId,
      workspaceId: decodedWorkspaceId,
    };
    return payload;
  }

  async verifyRefreshToken(
    token: string,
  ): Promise<IAuthenticationTokenPayload> {
    const tokenParts = token.split('-');
    if (tokenParts.length !== 3)
      throw new InvalidAuthenticationTokenException();

    const isValidToken =
      tokenParts[0] === 'refreshToken' &&
      tokenParts[1].length > 0 &&
      tokenParts[2].length > 0;

    if (!isValidToken) throw new InvalidAuthenticationTokenException();

    const decodedUserId = tokenParts[1].replace('%2D', '-');
    const decodedWorkspaceId = tokenParts[2].replace('%2D', '-');

    const payload: IAuthenticationTokenPayload = {
      sub: decodedUserId,
      workspaceId: decodedWorkspaceId,
    };
    return payload;
  }

  generate(user: User, workspace: Workspace): string {
    const encodedUserId = user.id?.replace('-', '%2D');
    const ecodedWorkspaceId = workspace.id?.replace('-', '%2D');
    return `token-${encodedUserId}-${ecodedWorkspaceId}`;
  }

  generateRefreshToken(user: User, workspace: Workspace): string {
    const encodedUserId = user.id?.replace('-', '%2D');
    const ecodedWorkspaceId = workspace.id?.replace('-', '%2D');
    return `refreshToken-${encodedUserId}-${ecodedWorkspaceId}`;
  }
}

export default FakeAuthenticationTokenProvider;
