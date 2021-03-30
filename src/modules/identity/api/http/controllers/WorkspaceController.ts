import WorkspaceAlreadyExistsException from '@modules/identity/domain/errors/WorkspaceAlreadyExistsException';
import ICreateWorkspaceService from '@modules/identity/domain/interfaces/services/ICreateWorkspaceService';
import AppHttpError from '@shared/errors/AppHttpError';
import HttpStatusCode from '@shared/errors/HttpStatusCodeEnum';
import { Request, Response } from 'express';
import { injectable, container } from "tsyringe";

@injectable()
class WorkspaceController {
  public async create(request: Request, response: Response): Promise<Response|undefined> {
    try {
      const { name, url } = request.body;

      console.log('before enter the domain service');
      const createWorkspaceService = container.resolve<ICreateWorkspaceService>('CreateWorkspaceService');
      const createWorkspaceResponse = 
        await createWorkspaceService.execute({ name, url });

      return response.json({
        id: createWorkspaceResponse.id,
        name: createWorkspaceResponse.name,
        url: createWorkspaceResponse.url,
      });

    } catch (error) {
      if(error instanceof WorkspaceAlreadyExistsException)
        throw new AppHttpError((error as WorkspaceAlreadyExistsException).message, HttpStatusCode.Conflict);
    }
  }
}

export default WorkspaceController;
