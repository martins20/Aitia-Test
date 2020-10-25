import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/User';
import IUserRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import CheckYupErrors from '../infra/yup/errors/CheckYupErrors';

interface IRequest {
    first_name: string;
    second_name: string;
    cpf: string;
    email: string;
    password: string;
    confirm_password: string;
    phone: string;
    cep: string;
    cnpj: string;
    company_name: string;
    address: string;
    number: number;
    complement: string;
    state: string;
    city: string;
}

@injectable()
class CreateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUserRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {}

    async execute(data: IRequest): Promise<User> {
        const { email, password, confirm_password, ...rest } = data;

        const checkUserExist = await this.usersRepository.findByEmail(email);

        if (checkUserExist) {
            throw new AppError('Email address already used');
        }

        // Validate request
        await CheckYupErrors(data);

        // checks if confirm_password was correct
        if (confirm_password !== password) {
            throw new AppError(
                'password and confirm_password must be the same',
            );
        }

        // Create hash to use on password hash
        const hashedPassword = await this.hashProvider.generateHash(password);

        const user = this.usersRepository.create({
            email,
            password_hash: hashedPassword,
            ...rest,
        });

        return user;
    }
}

export default CreateUserService;
