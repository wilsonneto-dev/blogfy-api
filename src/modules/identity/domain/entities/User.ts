/* eslint-disable import/no-cycle */
import Workspace from './Workspace';

class User {
  id?: string;
  name: string;
  email: string;
  password?: string;

  workspaces?: Array<Workspace>;
}

export default User;
