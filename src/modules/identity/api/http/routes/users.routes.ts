import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import UsersController from '../controllers/UsersController';
import protectRoute from '../middlewares/protectRoute';

const usersRouter = Router();

const usersController = new UsersController();

usersRouter.put(
  '/',
  protectRoute,
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      name: Joi.string().required(),
    },
  }),
  usersController.update,
);

usersRouter.put(
  '/password',
  protectRoute,
  celebrate({
    [Segments.BODY]: {
      newPassword: Joi.string().min(6).required(),
      currentPassword: Joi.string().required(),
    },
  }),
  usersController.updatePassword,
);

export default usersRouter;
