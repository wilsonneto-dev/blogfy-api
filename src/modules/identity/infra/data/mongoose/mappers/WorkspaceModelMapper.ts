import { Document } from 'mongoose';

import Workspace from '@modules/identity/domain/entities/Workspace';
import IMongooseModelMapper from './interface/IMongooseModelMapper';
import WorkspaceModel from '../models/WorkspaceModel';

class WorkspaceModelMapper implements IMongooseModelMapper<Workspace> {
  fromDomainEntity(workspace: Workspace): Document<any, {}> {
    const workspaceModel = new WorkspaceModel({
      _id: workspace.id ?? null,
      name: workspace.name,
      url: workspace.url,
    });

    return workspaceModel;
  }

  toDomainEntity(workspaceModel: any): Workspace {
    const workspace = new Workspace();
    workspace.id = workspaceModel._id as string;
    workspace.name = workspaceModel.name;
    workspace.url = workspaceModel.url;

    return workspace;
  }
}

export default WorkspaceModelMapper;
