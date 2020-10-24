import AppError from '@shared/errors/AppError';
import Budget from '../infra/typeorm/entities/Budget';

import FakeBudgetsRepository from '../repositories/fakes/FakeBudgetsRepository';
import CreateBudgetService from './CreateBudgetService';
import ListBudgetsService from './ListBudgetsService';

describe('ListBudgetsService', () => {
    it('should be able to list all budgets', async () => {
        const fakeBudgetsRepository = new FakeBudgetsRepository();

        const createBudget = new CreateBudgetService(fakeBudgetsRepository);
        const listBudgets = new ListBudgetsService(fakeBudgetsRepository);

        await createBudget.execute({
            name: 'Tinbeer',
            designer_quantity: 2,
            dev_quantity: 2,
            min_days: 60,
            po_quantity: 1,
            sm_quantity: 1,
            owner_id: '05460aa3-1249-49c7-a82c-c05a28d419a2',
        });

        await createBudget.execute({
            name: 'Tinbeer 1',
            designer_quantity: 2,
            dev_quantity: 2,
            min_days: 60,
            po_quantity: 0,
            sm_quantity: 1,
            owner_id: '05460aa3-1249-49c7-a82c-c05a28d419a2',
        });

        await createBudget.execute({
            name: 'Tinbeer 2',
            designer_quantity: 1,
            dev_quantity: 2,
            min_days: 60,
            po_quantity: 5,
            sm_quantity: 1,
            owner_id: '05460aa3-1249-49c7-a82c-c05a28d419a2',
        });

        const budgets = await listBudgets.execute(
            '05460aa3-1249-49c7-a82c-c05a28d419a2',
        );

        expect(budgets).toHaveLength(3);
    });
});
