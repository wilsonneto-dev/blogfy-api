export interface ICreateWorkspaceServiceRequest {
  name: string;
  url: string;
}

export interface ICreateWorkspaceServiceResponse {
  id: string;
  name: string;
  url: string;
}


export default interface ICreateWorkspaceService {
  execute: (request: ICreateWorkspaceServiceRequest) 
    => Promise<ICreateWorkspaceServiceResponse>
}
