import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';

describe('CreateUserService', () => {
    it('should be able to create a new user', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();

        const createUser = new CreateUserService(
            fakeUsersRepository,
            fakeHashProvider,
        );

        const user = await createUser.execute({
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

        expect(user).toHaveProperty('id');
    });

    it('should be able to not create a new user with wrong confirm password', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();

        const createUser = new CreateUserService(
            fakeUsersRepository,
            fakeHashProvider,
        );

        expect(
            createUser.execute({
                first_name: 'John',
                second_name: 'Doe',
                cpf: '54587965124',
                email: 'teste@teste.com',
                password: '123456',
                confirm_password: '12345',
                phone: '99999999999',
                cep: '28950000',
                cnpj: '99999999999999',
                company_name: 'Tinbeer inc',
                address: 'Rua tal',
                number: 18,
                state: 'Rio de Janeiro',
                city: 'Armação dos Búzios',
                complement: 'Casa',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should be able to not create a new user with an exist e-mail', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();

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
            createUser.execute({
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
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
