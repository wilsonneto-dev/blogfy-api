import EmailAlreadyExistsException from '@modules/identity/domain/errors/EmailAlreadyExistsException';
import ICreateUserService from '@modules/identity/domain/interfaces/services/ICreateUserService';
import AppHttpError from '@shared/errors/AppHttpError';
import HttpStatusCode from '@shared/errors/HttpStatusCodeEnum';
import { Response, Request } from 'express';
import { container, injectable } from 'tsyringe';

@injectable()
class UsersController {
  public async create(
    request: Request,
    response: Response,
  ): Promise<Response | undefined> {
    try {
      const { name, email, password, workspace, workspaceURL } = request.body;

      const createUserService = container.resolve<ICreateUserService>(
        'CreateUserService',
      );
      const createUserResponse = await createUserService.execute({
        name,
        email,
        password,
        workspace,
        workspaceURL,
      });

      return response.json({
        id: createUserResponse.id,
        workspaceId: createUserResponse.workspaceId,
        email: createUserResponse.email,
        name: createUserResponse.name,
        workspace: createUserResponse.workspace,
        workspaceURL: createUserResponse.workspaceURL,
      });
    } catch (error) {
      if (error instanceof EmailAlreadyExistsException)
        throw new AppHttpError(
          (error as EmailAlreadyExistsException).message,
          HttpStatusCode.Conflict,
        );
    }
  }
}

export default UsersController;
