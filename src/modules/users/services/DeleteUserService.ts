import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUserRepository from '../repositories/IUsersRepository';

@injectable()
class CreateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUserRepository,
    ) {}

    async execute(id: string): Promise<void> {
        const user = await this.usersRepository.findById(id);

        if (!user) throw new AppError('user not exists', 404);

        await this.usersRepository.destroy(user);
    }
}

export default CreateUserService;
