import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Budget from '../infra/typeorm/entities/Budget';
import IBudgetRepository from '../repositories/IBudgetsRepository';

@injectable()
class ShowBudgetService {
    constructor(
        @inject('BudgetsRepository')
        private budgetsRepository: IBudgetRepository,
    ) {}

    async execute(
        budget_id: string,
        user_id: string,
    ): Promise<Budget | undefined> {
        const budget = await this.budgetsRepository.findById(budget_id);

        if (!budget || budget.owner_id !== user_id)
            throw new AppError('Budget not exists', 404);

        return budget;
    }
}

export default ShowBudgetService;
