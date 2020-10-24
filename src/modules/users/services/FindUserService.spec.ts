import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';
import FindUserService from './FindUserService';

describe('FindUserService', () => {
    it('should be able to find an user', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();

        const createUser = new CreateUserService(
            fakeUsersRepository,
            fakeHashProvider,
        );

        const findUser = new FindUserService(fakeUsersRepository);

        const { id } = await createUser.execute({
            first_name: 'John',
            second_name: 'Doe',
            cpf: '54587965124',
            email: 'teste@teste.com',
            password: '123456',
            confirm_password: '123456',
            phone: '99999999999',
            cep: '28950000',
            address: 'Rua tal',
            number: 18,
            state: 'Rio de Janeiro',
            city: 'Armação dos Búzios',
            complement: 'Casa',
        });

        const user = await findUser.execute(id);

        expect(user).toHaveProperty('id');
    });

    it('should be able to not find an inexistent user', async () => {
        const fakeUsersRepository = new FakeUsersRepository();

        const findUser = new FindUserService(fakeUsersRepository);

        expect(
            findUser.execute('05460aa3-1249-49c7-a82c-c05a28d419a2'),
        ).rejects.toBeInstanceOf(AppError);
    });
});
