import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';
import DeleteUserService from '@modules/users/services/DeleteUserService';

export default class UsersController {
    async create(request: Request, response: Response) {
        const userData = request.body;

        const createUser = container.resolve(CreateUserService);

        let user = await createUser.execute(userData);

        delete user.password_hash;

        return response.json(user);
    }

    async delete(request: Request, response: Response) {
        const { user_id } = request.params;

        const deleteUser = container.resolve(DeleteUserService);

        await deleteUser.execute(user_id);

        return response.status(204).json();
    }
}
