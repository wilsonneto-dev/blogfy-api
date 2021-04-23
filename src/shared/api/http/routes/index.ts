import { Router } from 'express';

import identityModuleRouter from '@modules/identity/api/http/routes/index';

const routes = Router();

routes.use(identityModuleRouter);

export default routes;
