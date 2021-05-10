import { Document } from 'mongoose';

import User from '@modules/identity/domain/entities/User';
import IMongooseModelMapper from './interface/IMongooseModelMapper';
import WorkspaceModel from '../models/WorkspaceModel';
import WorkspaceModelMapper from './WorkspaceModelMapper';

class UserModelMapper implements IMongooseModelMapper<User> {
  private _workspaceMapper: WorkspaceModelMapper;

  constructor(workspaceMapper: WorkspaceModelMapper | null = null) {
    this._workspaceMapper = workspaceMapper ?? new WorkspaceModelMapper();
  }

  fromDomainEntity(user: User): Document<any, {}> {
    const workspacesModels: Array<Document<any, {}>> =
      user.workspaces?.map(workspace =>
        this._workspaceMapper.fromDomainEntity(workspace),
      ) ?? [];

    const workspaceModel = new WorkspaceModel({
      _id: user.id ?? null,
      name: user.name,
      email: user.email,
      password: user.password,
      workspaces: workspacesModels,
    });

    return workspaceModel;
  }

  toDomainEntity(userModel: any): User {
    const user = new User();
    user.id = userModel._id as string;
    user.name = userModel.name;
    user.email = userModel.email;
    user.password = userModel.password;
    user.workspaces = userModel.workspaces?.map(
      (workspaceModel: Document<any, {}>) =>
        this._workspaceMapper.toDomainEntity(workspaceModel),
    );

    return user;
  }
}

export default UserModelMapper;
