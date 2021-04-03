import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import AuthSessionsController from '../controllers/AuthSessionsController';

const accountsRouter = Router();

const authSessionsController = new AuthSessionsController();

accountsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  authSessionsController.create,
);

export default accountsRouter;
