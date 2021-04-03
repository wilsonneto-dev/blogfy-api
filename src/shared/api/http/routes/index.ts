import { Router } from 'express';

import usersRouter from '@modules/identity/api/http/routes/users.routes';
import accountsRouter from '@modules/identity/api/http/routes/accounts.route';
import authSessionRouter from '@modules/identity/api/http/routes/authSessions';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/accounts', accountsRouter);
routes.use('/auth/sessions', authSessionRouter);

export default routes;
