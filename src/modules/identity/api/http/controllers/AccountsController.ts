import { Request, Response } from 'express';
import { container, injectable } from 'tsyringe';

import ICreateAccountService from '@modules/identity/domain/interfaces/services/ICreateAccountService';
import WorkspaceUrlAlreadyExistsException from '@modules/identity/domain/errors/WorkspaceUrlAlreadyExistsException';
import EmailAlreadyExistsException from '@modules/identity/domain/errors/EmailAlreadyExistsException';
import AppHttpError from '@shared/errors/AppHttpError';
import HttpStatusCode from '@shared/errors/HttpStatusCodeEnum';

@injectable()
class AccountsController {
  public async create(
    request: Request,
    response: Response,
  ): Promise<Response | undefined> {
    try {
      const { name, email, password, workspace, workspaceURL } = request.body;

      const createAccountService = container.resolve<ICreateAccountService>(
        'CreateAccountService',
      );

      const serviceResponse = await createAccountService.execute({
        name,
        email,
        password,
        workspace,
        workspaceURL,
      });

      return response.json(serviceResponse);
    } catch (error) {
      if (
        error instanceof WorkspaceUrlAlreadyExistsException ||
        error instanceof EmailAlreadyExistsException
      ) {
        throw new AppHttpError(
          (error as EmailAlreadyExistsException).message,
          HttpStatusCode.Conflict,
        );
      }

      throw error;
    }
  }
}

export default AccountsController;
