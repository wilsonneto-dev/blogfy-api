import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticateUserService = new AuthenticateUserService();

  const result = await authenticateUserService.execute({
    email,
    password,
  });

  return response.json(result);
});

export default sessionsRouter;
