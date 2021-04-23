export default class WorkspaceUrlAlreadyExistsException {
  constructor(public message: string = 'Workspace URL already exists') {}
}
