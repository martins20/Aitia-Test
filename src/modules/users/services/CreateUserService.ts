import { hash } from 'bcryptjs';

import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/User';
import IUserRepository from '../repositories/IUsersRepository';

interface IRequest {
    first_name: string;
    second_name: string;
    cpf: string;
    email: string;
    password: string;
    confirm_password: string;
    phone: string;
    cep: string;
    address: string;
    number: number;
    complement: string;
    state: string;
    city: string;
}

class CreateUserService {
    constructor(private usersRepository: IUserRepository) {}

    async execute({
        email,
        password,
        confirm_password,
        ...rest
    }: IRequest): Promise<User> {
        const checkUserExist = await this.usersRepository.findByEmail(email);

        if (checkUserExist) {
            throw new AppError('Email address already used');
        }

        // checks if confirm_password was correct
        if (confirm_password !== password) {
            throw new AppError(
                '"password" and "confirm_password" must be the same',
            );
        }

        // Create hash to use on password hash
        const hashedPassword = await hash(password, 8);

        const user = this.usersRepository.create({
            email,
            password_hash: hashedPassword,
            ...rest,
        });

        return user;
    }
}

export default CreateUserService;
