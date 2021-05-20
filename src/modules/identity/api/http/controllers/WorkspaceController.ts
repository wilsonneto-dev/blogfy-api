import UserNotFoundException from '@modules/identity/domain/errors/UserNotFoundException';
import UserWithoutPermissionsException from '@modules/identity/domain/errors/UserWithoutPermissionsException';
import WorkspaceUrlAlreadyExistsException from '@modules/identity/domain/errors/WorkspaceUrlAlreadyExistsException';
import ICreateWorkspaceService from '@modules/identity/domain/interfaces/services/ICreateWorkspaceService';
import IUpdateWorkspaceService from '@modules/identity/domain/interfaces/services/IUpdateWorkspaceService';
import AppHttpError from '@shared/errors/AppHttpError';
import HttpStatusCode from '@shared/errors/HttpStatusCodeEnum';
import { Request, Response } from 'express';
import { injectable, container } from 'tsyringe';

@injectable()
class WorkspaceController {
  public async create(
    request: Request,
    response: Response,
  ): Promise<Response | undefined> {
    try {
      const { name, url } = request.body;

      const createWorkspaceService = container.resolve<ICreateWorkspaceService>(
        'CreateWorkspaceService',
      );
      const createWorkspaceResponse = await createWorkspaceService.execute({
        name,
        url,
      });

      return response.json({
        id: createWorkspaceResponse.id,
        name: createWorkspaceResponse.name,
        url: createWorkspaceResponse.url,
      });
    } catch (error) {
      if (error instanceof WorkspaceUrlAlreadyExistsException)
        throw new AppHttpError(
          (error as WorkspaceUrlAlreadyExistsException).message,
          HttpStatusCode.Conflict,
        );
    }
  }

  public async update(
    request: Request,
    response: Response,
  ): Promise<Response | undefined> {
    try {
      const { name, url } = request.body;
      const { userId, workspaceId } = request.authentication!;

      const updateWorkspaceService = container.resolve<IUpdateWorkspaceService>(
        'UpdateWorkspaceService',
      );
      const updateWorkspaceResponse = await updateWorkspaceService.execute({
        userId,
        workspaceId,
        name,
        url,
      });

      return response.json({
        id: updateWorkspaceResponse.workspaceId,
        name: updateWorkspaceResponse.name,
        url: updateWorkspaceResponse.url,
      });
    } catch (error) {
      if (error instanceof UserNotFoundException)
        throw new AppHttpError(
          (error as UserNotFoundException).message,
          HttpStatusCode.Unauthorized,
        );

      if (error instanceof UserWithoutPermissionsException)
        throw new AppHttpError(
          (error as UserWithoutPermissionsException).message,
          HttpStatusCode.Forbidden,
        );

      if (error instanceof WorkspaceUrlAlreadyExistsException)
        throw new AppHttpError(
          (error as WorkspaceUrlAlreadyExistsException).message,
          HttpStatusCode.Conflict,
        );

      throw error;
    }
  }
}

export default WorkspaceController;
