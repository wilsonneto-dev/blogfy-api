import AppHttpError from '@shared/errors/AppHttpError';
import HttpStatusCode from '@shared/errors/HttpStatusCodeEnum';
import { Request, Response, NextFunction } from 'express';

import IAuthenticationTokenProvider, {
  IAuthenticationTokenPayload,
} from '@modules/identity/domain/interfaces/providers/IAuthenticationTokenProvider';
import { container } from 'tsyringe';
import AuthenticationSessionExpiredException from '@modules/identity/domain/errors/AuthenticationSessionExpiredException';

async function protectRoute(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authorizationHeader = request.headers.authorization;
  if (!authorizationHeader)
    throw new AppHttpError(
      'Unauthorized - Token not found',
      HttpStatusCode.Unauthorized,
    );

  const authorizationHeaderParts = (authorizationHeader as string).split(' ');
  if (authorizationHeaderParts.length < 2)
    throw new AppHttpError(
      'Unauthorized - Token in wrong format',
      HttpStatusCode.Unauthorized,
    );

  const token = authorizationHeaderParts[1];

  try {
    const tokenProvider = container.resolve<IAuthenticationTokenProvider>(
      'AuthenticationTokenProvider',
    );

    const decodedToken: IAuthenticationTokenPayload = (await tokenProvider.verify(
      token,
    )) as IAuthenticationTokenPayload;

    request.authentication = {
      userId: decodedToken.sub,
      workspaceId: decodedToken.workspaceId,
    };

    return next();
  } catch (error) {
    if (error instanceof AuthenticationSessionExpiredException) {
      throw new AppHttpError(
        `Unauthorized - ${
          (error as AuthenticationSessionExpiredException).message
        }`,
        HttpStatusCode.Unauthorized,
      );
    }

    throw new AppHttpError(
      'Unauthorized - Invalid token',
      HttpStatusCode.Unauthorized,
    );
  }
}

export default protectRoute;
