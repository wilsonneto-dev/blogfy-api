import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import AuthPasswordController from '../controllers/AuthPasswordController';

const authPasswordRouter = Router();
const authPasswordController = new AuthPasswordController();

authPasswordRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  authPasswordController.requestRecoveryPassword,
);

authPasswordRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      email: Joi.string().email().required(),
      token: Joi.string().required(),
    },
  }),
  authPasswordController.checkRecoveryPasswordToken,
);

export default authPasswordRouter;
