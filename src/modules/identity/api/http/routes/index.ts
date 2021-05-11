import { Router } from 'express';

import usersRouter from './users.routes';
import accountsRouter from './accounts.route';
import authSessionRouter from './authSessions';
import workspacesRouter from './workspaces.routes';
import authPasswordRouter from './authPassword.route';

const identityModuleRouter = Router();

identityModuleRouter.use('/users', usersRouter);
identityModuleRouter.use('/accounts', accountsRouter);
identityModuleRouter.use('/workspaces', workspacesRouter);
identityModuleRouter.use('/auth/sessions', authSessionRouter);
identityModuleRouter.use('/auth/recovery', authPasswordRouter);

export default identityModuleRouter;
