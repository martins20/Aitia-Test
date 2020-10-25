import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

describe('AuthenticateUserService', () => {
    it('should be able authenticate', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();

        const authenticateUser = new AuthenticateUserService(
            fakeUsersRepository,
            fakeHashProvider,
        );
        const createUser = new CreateUserService(
            fakeUsersRepository,
            fakeHashProvider,
        );

        await createUser.execute({
            first_name: 'John',
            second_name: 'Doe',
            cpf: '54587965124',
            email: 'teste@teste.com',
            password: '123456',
            confirm_password: '123456',
            phone: '99999999999',
            cep: '28950000',
            cnpj: '99999999999999',
            company_name: 'Tinbeer inc',
            address: 'Rua tal',
            number: 18,
            state: 'Rio de Janeiro',
            city: 'Armação dos Búzios',
            complement: 'Casa',
        });

        const response = await authenticateUser.execute({
            email: 'teste@teste.com',
            password: '123456',
        });

        expect(response).toHaveProperty('token');
    });

    it('should be not able to authenticate with non existent email', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();

        const authenticateUser = new AuthenticateUserService(
            fakeUsersRepository,
            fakeHashProvider,
        );
        const createUser = new CreateUserService(
            fakeUsersRepository,
            fakeHashProvider,
        );

        await createUser.execute({
            first_name: 'John',
            second_name: 'Doe',
            cpf: '54587965124',
            email: 'teste@teste.com',
            password: '123456',
            confirm_password: '123456',
            phone: '99999999999',
            cep: '28950000',
            cnpj: '99999999999999',
            company_name: 'Tinbeer inc',
            address: 'Rua tal',
            number: 18,
            state: 'Rio de Janeiro',
            city: 'Armação dos Búzios',
            complement: 'Casa',
        });

        expect(
            authenticateUser.execute({
                email: 'teste1@teste.com',
                password: '123456',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should be not able to authenticate with wrong password', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();

        const authenticateUser = new AuthenticateUserService(
            fakeUsersRepository,
            fakeHashProvider,
        );
        const createUser = new CreateUserService(
            fakeUsersRepository,
            fakeHashProvider,
        );

        await createUser.execute({
            first_name: 'John',
            second_name: 'Doe',
            cpf: '54587965124',
            email: 'teste@teste.com',
            password: '123456',
            confirm_password: '123456',
            phone: '99999999999',
            cep: '28950000',
            cnpj: '99999999999999',
            company_name: 'Tinbeer inc',
            address: 'Rua tal',
            number: 18,
            state: 'Rio de Janeiro',
            city: 'Armação dos Búzios',
            complement: 'Casa',
        });

        expect(
            authenticateUser.execute({
                email: 'teste@teste.com',
                password: '1234',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
