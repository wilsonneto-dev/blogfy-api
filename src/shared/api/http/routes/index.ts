import { Router } from 'express';

import usersRouter from '@modules/identity/api/http/routes/users.routes';
import accountsRouter from '@modules/identity/api/http/routes/accounts.route';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/accounts', accountsRouter);

export default routes;
