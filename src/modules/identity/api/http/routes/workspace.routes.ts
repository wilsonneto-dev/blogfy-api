import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { container } from 'tsyringe';
import UsersController from '../controllers/UsersController';
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

export default workspaceRouter;
