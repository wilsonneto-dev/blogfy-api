import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { container } from 'tsyringe';

import AccountsController from '../controllers/AccountsController';

const accountsRouter = Router();

const accountsController = new AccountsController();

accountsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      name: Joi.string().required(),
      password: Joi.string().required(),
      workspace: Joi.string().required(),
      workspaceURL: Joi.string().required(),
    },
  }),
  accountsController.create,
);

export default accountsRouter;
