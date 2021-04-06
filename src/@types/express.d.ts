/* eslint-disable @typescript-eslint/naming-convention */
declare namespace Express {
  export interface Request {
    authentication?: {
      userId: string;
      workspaceId: string;
    };
  }
}
