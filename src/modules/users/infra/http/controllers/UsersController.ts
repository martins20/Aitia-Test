import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';

export default class UsersController {
    async create(request: Request, response: Response) {
        const userData = request.body;

        const createUser = container.resolve(CreateUserService);

        let user = await createUser.execute(userData);

        delete user.password_hash;

        return response.json(user);
    }
}
