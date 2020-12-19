import CreateUserService from '@modules/identity/domain/services/CreateUserService';
import { Response, Request } from 'express';
import { container } from 'tsyringe';

class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUserService = container.resolve(CreateUserService);
    const user = await createUserService.execute({ name, email, password });

    return response.json({
      id: user.id,
      email: user.email,
      name: user.name,
    });
  }
}

export default UsersController;
