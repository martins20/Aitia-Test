import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';
import DeleteUserService from './DeleteUserService';

describe('DeleteUSerService', () => {
    it('should be able to delete an user', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();

        const createUser = new CreateUserService(
            fakeUsersRepository,
            fakeHashProvider,
        );

        const deleteUser = new DeleteUserService(fakeUsersRepository);

        const { id } = await createUser.execute({
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

        const deletedUser = await deleteUser.execute(id, id);

        expect(deletedUser).toBeUndefined();
    });

    it('should be able to not delete unexistent user', async () => {
        const fakeUsersRepository = new FakeUsersRepository();

        const deleteUser = new DeleteUserService(fakeUsersRepository);

        expect(
            deleteUser.execute(
                'd9d9d8db-6685-4626-887c-b9db4a5dfe29',
                'd9d9d8db-6685-4626-887c-b9db4a5ddt85',
            ),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should be able to not delete an account with id different of yours', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();

        const createUser = new CreateUserService(
            fakeUsersRepository,
            fakeHashProvider,
        );

        const { id } = await createUser.execute({
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

        const deleteUser = new DeleteUserService(fakeUsersRepository);

        expect(
            deleteUser.execute(id, 'd9d9d8db-6685-4626-887c-b9db4a5ddt85'),
        ).rejects.toBeInstanceOf(AppError);
    });
});
