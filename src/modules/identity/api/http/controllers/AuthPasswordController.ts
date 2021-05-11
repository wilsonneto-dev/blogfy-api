import AppHttpError from '@shared/errors/AppHttpError';
import HttpStatusCode from '@shared/errors/HttpStatusCodeEnum';
import { Request, Response } from 'express';
import { container, injectable } from 'tsyringe';

import IRecoveryPasswordService from '@modules/identity/domain/interfaces/services/IRecoveryPasswordService';
import UserNotFoundException from '@modules/identity/domain/errors/UserNotFoundException';
import ICheckRecoveryPasswordTokenService from '@modules/identity/domain/interfaces/services/ICheckRecoveryPasswordTokenService';
import InvalidRecoveryPasswordTokenException from '@modules/identity/domain/errors/InvalidRecoveryPasswordTokenException';

@injectable()
class AuthPasswordController {
  public async requestRecoveryPassword(
    request: Request,
    response: Response,
  ): Promise<Response | undefined> {
    try {
      const { email } = request.body;

      const recoveryPasswordService = container.resolve<
        IRecoveryPasswordService
      >('RecoveryPasswordService');

      const serviceResponse = await recoveryPasswordService.execute({
        email,
      });

      return response.json(serviceResponse);
    } catch (error) {
      if (error instanceof UserNotFoundException) {
        throw new AppHttpError(
          (error as UserNotFoundException).message,
          HttpStatusCode.NotFound,
        );
      }

      throw error;
    }
  }

  public async checkRecoveryPasswordToken(
    request: Request,
    response: Response,
  ): Promise<Response | undefined> {
    try {
      const { email, token } = request.query;

      const checkRecoveryPasswordTokenService = container.resolve<
        ICheckRecoveryPasswordTokenService
      >('CheckRecoveryPasswordTokenService');

      const serviceResponse = await checkRecoveryPasswordTokenService.execute({
        email,
        token,
      });

      return response.json(serviceResponse);
    } catch (error) {
      if (error instanceof UserNotFoundException) {
        throw new AppHttpError(
          (error as UserNotFoundException).message,
          HttpStatusCode.NotFound,
        );
      }

      if (error instanceof InvalidRecoveryPasswordTokenException) {
        throw new AppHttpError(
          (error as InvalidRecoveryPasswordTokenException).message,
          HttpStatusCode.Unauthorized,
        );
      }

      throw error;
    }
  }
}

export default AuthPasswordController;
