import AppError from '@shared/errors/AppError';
import Budget from '../infra/typeorm/entities/Budget';

import FakeBudgetsRepository from '../repositories/fakes/FakeBudgetsRepository';
import CreateBudgetService from './CreateBudgetService';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from '@modules/users/services/CreateUserService';

describe('CreateBudgetServer', () => {
    it('should be able to create a new budget', async () => {
        const fakeBudgetsRepository = new FakeBudgetsRepository();
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();

        const createBudget = new CreateBudgetService(fakeBudgetsRepository);
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

        const budget = await createBudget.execute({
            name: 'Tinbeer',
            designer_quantity: 2,
            dev_quantity: 2,
            min_days: 60,
            po_quantity: 1,
            sm_quantity: 1,
            owner_id: id,
        });

        expect(budget).toHaveProperty('budget_id');
    });

    it('should be not able to create a new budget withou any params', async () => {
        const fakeBudgetsRepository = new FakeBudgetsRepository();

        const createBudget = new CreateBudgetService(fakeBudgetsRepository);

        expect(createBudget.execute({} as Budget)).rejects.toBeInstanceOf(
            AppError,
        );
    });

    it('should be not able to create a new budget withou an existent user', async () => {
        const fakeBudgetsRepository = new FakeBudgetsRepository();

        const createBudget = new CreateBudgetService(fakeBudgetsRepository);

        expect(createBudget.execute({} as Budget)).rejects.toBeInstanceOf(
            AppError,
        );
    });
});
