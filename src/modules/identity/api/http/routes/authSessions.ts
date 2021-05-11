import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import AuthSessionsController from '../controllers/AuthSessionsController';
import protectRoute from '../middlewares/protectRoute';

const authSessionRouter = Router();

const authSessionsController = new AuthSessionsController();

authSessionRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  authSessionsController.create,
);

authSessionRouter.get('/', protectRoute, authSessionsController.get);

authSessionRouter.put(
  '/',
  protectRoute,
  celebrate({
    [Segments.BODY]: {
      workspaceId: Joi.string().required(),
    },
  }),
  authSessionsController.update,
);

authSessionRouter.post(
  '/refresh',
  celebrate({
    [Segments.BODY]: {
      refreshToken: Joi.string().required(),
    },
  }),
  authSessionsController.refresh,
);

export default authSessionRouter;
