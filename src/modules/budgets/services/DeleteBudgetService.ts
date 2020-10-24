import { injectable, inject } from 'tsyringe';

import Budget from '../infra/typeorm/entities/Budget';
import IBudgetRepository from '../repositories/IBudgetsRepository';

@injectable()
class ListBudgetsService {
    constructor(
        @inject('BudgetsRepository')
        private budgetsRepository: IBudgetRepository,
    ) {}

    async execute(id: string): Promise<Budget[] | undefined> {
        const budgets = await this.budgetsRepository.destroy(id);
    }
}

export default ListBudgetsService;
