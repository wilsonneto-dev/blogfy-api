import AuthenticationFailedException from '@modules/identity/domain/errors/AuthenticationFailedException';
import IAuthenticateUserService from '@modules/identity/domain/interfaces/services/IAuthenticateUserService';
import AppHttpError from '@shared/errors/AppHttpError';
import HttpStatusCode from '@shared/errors/HttpStatusCodeEnum';
import { Request, Response } from 'express';
import { container, injectable } from 'tsyringe';

@injectable()
class AuthSessionsController {
  public async create(
    request: Request,
    response: Response,
  ): Promise<Response | undefined> {
    try {
      const { email, password } = request.body;

      const authenticateUserService = container.resolve<
        IAuthenticateUserService
      >('AuthenticateUserService');

      console.log('before service');
      const serviceResponse = await authenticateUserService.execute({
        email,
        password,
      });

      return response.json(serviceResponse);
    } catch (error) {
      if (error instanceof AuthenticationFailedException) {
        throw new AppHttpError(
          (error as AuthenticationFailedException).message,
          HttpStatusCode.Unauthorized,
        );
      }
    }
  }
}

export default AuthSessionsController;
