import AuthenticationFailedException from '@modules/identity/domain/errors/AuthenticationFailedException';
import UserNotFoundException from '@modules/identity/domain/errors/UserNotFoundException';
import UserWithoutPermissionsException from '@modules/identity/domain/errors/UserWithoutPermissionsException';
import IAuthenticateUserService from '@modules/identity/domain/interfaces/services/IAuthenticateUserService';
import IChangeCurrentWorkspaceService from '@modules/identity/domain/interfaces/services/IChangeCurrentWorkspaceService';
import IGetUserInfoService from '@modules/identity/domain/interfaces/services/IGetUserInfoService';
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

  public async get(
    request: Request,
    response: Response,
  ): Promise<Response | undefined> {
    try {
      const { userId, workspaceId } = request.authentication!;

      const getUserInfoService = container.resolve<IGetUserInfoService>(
        'GetUserInfoService',
      );

      const serviceResponse = await getUserInfoService.execute({
        userId,
        workspaceId,
      });

      return response.json(serviceResponse);
    } catch (error) {
      if (error instanceof UserNotFoundException) {
        throw new AppHttpError(
          (error as UserNotFoundException).message,
          HttpStatusCode.NotFound,
        );
      }

      if (error instanceof UserWithoutPermissionsException) {
        throw new AppHttpError(
          (error as UserWithoutPermissionsException).message,
          HttpStatusCode.Forbidden,
        );
      }
    }
  }

  public async update(
    request: Request,
    response: Response,
  ): Promise<Response | undefined> {
    try {
      const changeCurrentWorkspaceService = container.resolve<
        IChangeCurrentWorkspaceService
      >('ChangeCurrentWorkspaceService');

      const { workspaceId } = request.body;

      const serviceResponse = await changeCurrentWorkspaceService.execute({
        userId: request.authentication!.userId,
        targetWorkspaceId: workspaceId,
      });

      return response.json(serviceResponse);
    } catch (error) {
      if (error instanceof UserNotFoundException) {
        throw new AppHttpError(
          (error as UserNotFoundException).message,
          HttpStatusCode.NotFound,
        );
      }

      if (error instanceof UserWithoutPermissionsException) {
        throw new AppHttpError(
          (error as UserWithoutPermissionsException).message,
          HttpStatusCode.Forbidden,
        );
      }

      throw error;
    }
  }
}

export default AuthSessionsController;
