import AppError from '@shared/errors/AppError';

import FakeBudgetsRepository from '../repositories/fakes/FakeBudgetsRepository';
import CreateBudgetService from './CreateBudgetService';
import DeleteBudgetService from './DeleteBudgetService';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from '@modules/users/services/CreateUserService';

describe('DeleteBudgetService', () => {
    it('should be able to delete an existent budget', async () => {
        const fakeBudgetsRepository = new FakeBudgetsRepository();
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();

        const createBudget = new CreateBudgetService(fakeBudgetsRepository);
        const deleteBudget = new DeleteBudgetService(fakeBudgetsRepository);
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
            address: 'Rua tal',
            number: 18,
            state: 'Rio de Janeiro',
            city: 'Armação dos Búzios',
            complement: 'Casa',
        });

        const { budget_id } = await createBudget.execute({
            name: 'Tinbeer',
            designer_quantity: 2,
            dev_quantity: 1,
            min_days: 60,
            po_quantity: 1,
            sm_quantity: 1,
            owner_id: id,
            budget_price: 48000,
        });

        const deletedUser = await deleteBudget.execute(budget_id);

        expect(deletedUser).toBeUndefined();
    });

    it('should be not able to delete an inexistent budget', async () => {
        const fakeBudgetsRepository = new FakeBudgetsRepository();

        const deleteBudget = new DeleteBudgetService(fakeBudgetsRepository);

        expect(
            deleteBudget.execute('c26efa8e-62c2-4dce-b636-ba45fe645df0'),
        ).rejects.toBeInstanceOf(AppError);
    });
});
