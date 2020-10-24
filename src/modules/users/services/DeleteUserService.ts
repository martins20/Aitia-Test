import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUserRepository from '../repositories/IUsersRepository';

@injectable()
class CreateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUserRepository,
    ) {}

    async execute(params_id: string, my_id: string): Promise<void> {
        const user = await this.usersRepository.findById(params_id);

        if (!user) throw new AppError('User not exists', 404);

        if (params_id !== my_id)
            throw new AppError(
                'Operation not permitted, cannot delete another user account',
            );

        await this.usersRepository.destroy(user);
    }
}

export default CreateUserService;
