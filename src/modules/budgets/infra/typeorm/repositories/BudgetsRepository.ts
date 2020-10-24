import { getRepository, Repository } from 'typeorm';

import IBudgetRepository from '@modules/budgets/repositories/IBudgetsRepository';
import ICreateBudgetDTO from '@modules/budgets/dtos/ICreateBudgetDTO';

import Budget from '../entities/Budget';
import User from '@modules/users/infra/typeorm/entities/User';

class BudgetsRepository implements IBudgetRepository {
    private ormRepository: Repository<Budget>;

    constructor() {
        this.ormRepository = getRepository(Budget);
    }

    async list(): Promise<Budget[] | undefined> {
        const budgets = this.ormRepository.find();

        return budgets;
    }

    async findById(id: string): Promise<Budget | undefined> {
        const user = await this.ormRepository.findOne({ budget_id: id });

        return user;
    }

    async create(userData: ICreateBudgetDTO): Promise<Budget> {
        const user = this.ormRepository.create(userData);

        await this.ormRepository.save(user);

        return user;
    }

    async destroy(user: Budget): Promise<void> {
        await this.ormRepository.remove(user);
    }

    async save(user: Budget): Promise<Budget> {
        return this.ormRepository.save(user);
    }
}

export default BudgetsRepository;
