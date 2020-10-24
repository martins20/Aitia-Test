import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUserRepository from '../repositories/IUsersRepository';
import User from '../infra/typeorm/entities/User';

@injectable()
class CreateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUserRepository,
    ) {}

    async execute(my_id: string): Promise<User> {
        const user = await this.usersRepository.findById(my_id);

        if (!user) throw new AppError('User not exists', 404);

        return user;
    }
}

export default CreateUserService;
