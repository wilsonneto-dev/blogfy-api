/* eslint-disable import/no-cycle */
import User from './User';

class Workspace {
  id?: string;
  name: string;
  url: string;

  users?: Array<User>;
}

export default Workspace;
