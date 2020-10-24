import { v4 } from 'uuid';

import IUserRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import User from '../../infra/typeorm/entities/User';

class UsersRepository implements IUserRepository {
    private users: User[] = [];

    async findById(id: string): Promise<User | undefined> {
        const findId = this.users.find(user => user.id === id);

        return findId;
    }

    async findByEmail(email: string): Promise<User | undefined> {
        const findEmail = this.users.find(user => user.email === email);

        return findEmail && findEmail;
    }

    async create({
        first_name,
        second_name,
        cpf,
        email,
        password_hash,
        phone,
        cep,
        address,
        number,
        complement,
        state,
        city,
    }: ICreateUserDTO): Promise<User> {
        const user = new User();

        Object.assign(user, {
            id: v4(),
            first_name,
            second_name,
            cpf,
            email,
            password_hash,
            phone,
            cep,
            address,
            number,
            complement,
            state,
            city,
        });

        this.users.push(user);

        return user;
    }

    async destroy(user: User): Promise<void> {
        this.users = this.users.filter(targetUser => targetUser !== user);
    }

    async save(user: User): Promise<User> {
        const findIndex = this.users.findIndex(
            findUser => findUser.id === user.id,
        );

        this.users[findIndex] = user;

        return user;
    }
}

export default UsersRepository;
