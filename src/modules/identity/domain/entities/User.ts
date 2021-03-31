import Workspace from "./Workspace";

class User {
  id?: string;
  name: string;
  email: string;
  password?: string;

  workspaces: Array<Workspace>

  createdAt: Date;
  updatetAt: Date;
}

export default User;
