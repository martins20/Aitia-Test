import { injectable, inject } from 'tsyringe';

import IBudgetRepository from '../repositories/IBudgetsRepository';

import AppError from '@shared/errors/AppError';

@injectable()
class ListBudgetsService {
    constructor(
        @inject('BudgetsRepository')
        private budgetsRepository: IBudgetRepository,
    ) {}

    async execute(budget_id: string): Promise<void> {
        const findBudget = await this.budgetsRepository.findById(budget_id);

        if (!findBudget) throw new AppError('Budget not exists', 404);

        await this.budgetsRepository.destroy(findBudget);
    }
}

export default ListBudgetsService;
