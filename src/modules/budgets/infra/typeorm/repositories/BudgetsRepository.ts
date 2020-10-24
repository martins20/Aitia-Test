import { getRepository, Repository } from 'typeorm';

import IBudgetRepository from '@modules/budgets/repositories/IBudgetsRepository';
import ICreateBudgetDTO from '@modules/budgets/dtos/ICreateBudgetDTO';

import Budget from '../entities/Budget';

class BudgetsRepository implements IBudgetRepository {
    private ormRepository: Repository<Budget>;

    constructor() {
        this.ormRepository = getRepository(Budget);
    }

    async list(id: string): Promise<Budget[] | undefined> {
        const budgets = await this.ormRepository.find({
            where: {
                owner_id: id,
            },
        });

        return budgets.map(budget => {
            delete budget.User.password_hash;

            return budget;
        });
    }

    async findById(id: string): Promise<Budget | undefined> {
        const bugdet = await this.ormRepository.findOne({
            where: { budget_id: id },
        });

        return bugdet;
    }

    async create(userData: ICreateBudgetDTO): Promise<Budget> {
        const bugdet = await this.ormRepository.create(userData);

        await this.ormRepository.save(bugdet);

        return bugdet;
    }

    async destroy(bugdet: Budget): Promise<void> {
        await this.ormRepository.remove(bugdet);
    }

    async save(bugdet: Budget): Promise<Budget> {
        return this.ormRepository.save(bugdet);
    }
}

export default BudgetsRepository;
