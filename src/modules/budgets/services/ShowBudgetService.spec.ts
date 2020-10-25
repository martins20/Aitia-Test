import AppError from '@shared/errors/AppError';

import FakeBudgetsRepository from '../repositories/fakes/FakeBudgetsRepository';
import CreateBudgetService from './CreateBudgetService';
import ShowBudgetService from './ShowBudgetService';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from '@modules/users/services/CreateUserService';

describe('ShowBudgetService', () => {
    it('should be able to shows an existent budget', async () => {
        const fakeBudgetsRepository = new FakeBudgetsRepository();
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();

        const createBudget = new CreateBudgetService(fakeBudgetsRepository);
        const showBudget = new ShowBudgetService(fakeBudgetsRepository);
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
            company_name: 'Tinbeer inc',
            cnpj: '99999999999999',
            address: 'Rua tal',
            number: 18,
            state: 'Rio de Janeiro',
            city: 'Armação dos Búzios',
            complement: 'Casa',
        });

        const { budget_id } = await createBudget.execute({
            name: 'Tinbeer',
            designer_quantity: 1,
            dev_quantity: 1,
            min_days: 10,
            po_quantity: 1,
            sm_quantity: 1,
            owner_id: id,
            budget_price: 48000,
        });

        const findedBudget = await showBudget.execute(budget_id, id);

        expect(findedBudget).toHaveProperty('budget_id');
    });

    it('should be not able to shows an inexistent budget', async () => {
        const fakeBudgetsRepository = new FakeBudgetsRepository();
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();

        const showBudget = new ShowBudgetService(fakeBudgetsRepository);
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
            company_name: 'Tinbeer inc',
            cnpj: '99999999999999',
            address: 'Rua tal',
            number: 18,
            state: 'Rio de Janeiro',
            city: 'Armação dos Búzios',
            complement: 'Casa',
        });

        expect(
            showBudget.execute('87be9b23-700c-4b08-a22e-344cc61uwc5', id),
        ).rejects.toBeInstanceOf(AppError);
    });
});
