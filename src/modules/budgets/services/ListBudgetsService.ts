import { injectable, inject } from 'tsyringe';

import Budget from '../infra/typeorm/entities/Budget';
import IBudgetRepository from '../repositories/IBudgetsRepository';

@injectable()
class ListBudgetsService {
    constructor(
        @inject('BudgetsRepository')
        private budgetsRepository: IBudgetRepository,
    ) {}

    async execute(): Promise<Budget[] | undefined> {
        const budgets = this.budgetsRepository.list();

        return budgets;
    }
}

export default ListBudgetsService;
