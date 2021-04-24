import AuthenticationFailedException from '@modules/identity/domain/errors/AuthenticationFailedException';
import EmailAlreadyExistsException from '@modules/identity/domain/errors/EmailAlreadyExistsException';
import InvalidPasswordException from '@modules/identity/domain/errors/InvalidPasswordException';
import UserNotFoundException from '@modules/identity/domain/errors/UserNotFoundException';
import ICreateUserService from '@modules/identity/domain/interfaces/services/ICreateUserService';
import IUpdatePasswordService from '@modules/identity/domain/interfaces/services/IUpdatePasswordService';
import IUpdateUserService from '@modules/identity/domain/interfaces/services/IUpdateUserService';
import AppHttpError from '@shared/errors/AppHttpError';
import HttpStatusCode from '@shared/errors/HttpStatusCodeEnum';
import { Response, Request } from 'express';
import { container, injectable } from 'tsyringe';

@injectable()
class UsersController {
  public async update(
    request: Request,
    response: Response,
  ): Promise<Response | undefined> {
    try {
      const { name, email } = request.body;
      const { userId } = request.authentication!;

      const createUserService = container.resolve<IUpdateUserService>(
        'UpdateUserService',
      );

      const updateUserServiceResponse = await createUserService.execute({
        userId,
        name,
        email,
      });

      return response.json(updateUserServiceResponse);
    } catch (error) {
      if (error instanceof EmailAlreadyExistsException)
        throw new AppHttpError(
          (error as EmailAlreadyExistsException).message,
          HttpStatusCode.Conflict,
          'EmailAlreadyExistsException',
        );

      if (error instanceof UserNotFoundException)
        throw new AppHttpError(
          (error as UserNotFoundException).message,
          HttpStatusCode.NotFound,
          'UserNotFoundException',
        );

      throw error;
    }
  }

  public async updatePassword(
    request: Request,
    response: Response,
  ): Promise<Response | undefined> {
    try {
      const { currentPassword, newPassword } = request.body;
      const { userId } = request.authentication!;

      const updatePasswordService = container.resolve<IUpdatePasswordService>(
        'UpdatePasswordService',
      );

      const updatePasswordServiceResponse = await updatePasswordService.execute(
        {
          userId,
          currentPassword,
          newPassword,
        },
      );

      if (updatePasswordServiceResponse.success !== true)
        throw Error("Can't update user service");

      return response.status(HttpStatusCode.NoContent).send();
    } catch (error) {
      if (error instanceof AuthenticationFailedException)
        throw new AppHttpError(
          (error as AuthenticationFailedException).message,
          HttpStatusCode.Unauthorized,
        );

      if (error instanceof UserNotFoundException)
        throw new AppHttpError(
          (error as UserNotFoundException).message,
          HttpStatusCode.NotFound,
        );

      if (error instanceof InvalidPasswordException)
        throw new AppHttpError(
          (error as InvalidPasswordException).message,
          HttpStatusCode.UnprocessableEntity,
        );

      throw error;
    }
  }
}

export default UsersController;
