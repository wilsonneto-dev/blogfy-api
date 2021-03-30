import { Router } from 'express';

import usersRouter from '@modules/identity/api/http/routes/users.routes';
import workspacesRouter from '@modules/identity/api/http/routes/workspace.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/workspace', workspacesRouter);

export default routes;
