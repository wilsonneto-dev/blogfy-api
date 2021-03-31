import User from "./User";

class Workspace {
  id?: string;
  name: string;
  url: string;

  users?: Array<User>;

  createdAt?: Date;
  updatetAt?: Date;
}

export default Workspace;