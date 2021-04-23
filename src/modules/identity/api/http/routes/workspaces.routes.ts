import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import protectRoute from '../middlewares/protectRoute';

import WorkspaceController from '../controllers/WorkspaceController';

const workspaceRouter = Router();

const workspaceController = new WorkspaceController();

workspaceRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      url: Joi.string().required(),
    },
  }),
  workspaceController.create,
);

workspaceRouter.put(
  '/',
  protectRoute,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      url: Joi.string().required(),
    },
  }),
  workspaceController.update,
);

export default workspaceRouter;
