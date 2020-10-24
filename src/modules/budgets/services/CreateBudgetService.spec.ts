import AppError from '@shared/errors/AppError';
import Budget from '../infra/typeorm/entities/Budget';

import FakeBudgetsRepository from '../repositories/fakes/FakeBudgetsRepository';
import CreateBudgetService from './CreateBudgetService';

describe('CreateBudgetServer', () => {
    it('should be able to create a new budget', async () => {
        const fakeBudgetsRepository = new FakeBudgetsRepository();

        const createBudget = new CreateBudgetService(fakeBudgetsRepository);

        const budget = await createBudget.execute({
            name: 'Tinbeer',
            designer_quantity: 2,
            dev_quantity: 2,
            min_day: 60,
            po_quantity: 1,
            sm_quantity: 1,
        });

        expect(budget).toHaveProperty('id');
    });

    it('should be not able to create a new budget withou any params', async () => {
        const fakeBudgetsRepository = new FakeBudgetsRepository();

        const createBudget = new CreateBudgetService(fakeBudgetsRepository);

        expect(createBudget.execute({} as Budget)).rejects.toBeInstanceOf(
            AppError,
        );
    });
});
