import { Router } from 'express';

import usersRouter from '@modules/identity/app/http/routes/users.routes';
// import sessionsRouter from '@modules/identity/app/http/routes/sessions.routes';

const routes = Router();

routes.use('/users', usersRouter);
// routes.use('/sessions', sessionsRouter);

export default routes;
