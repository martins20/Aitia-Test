import { v4 } from 'uuid';

import IBudgetRepository from '@modules/budgets/repositories/IBudgetsRepository';
import ICreateBudgetDTO from '@modules/budgets/dtos/ICreateBudgetDTO';

import Budget from '@modules/budgets/infra/typeorm/entities/Budget';

class BudgetsRepository implements IBudgetRepository {
    private budgets: Budget[] = [];

    async list(): Promise<Budget[] | undefined> {
        return this.budgets;
    }

    async findById(id: string): Promise<Budget | undefined> {
        const findId = this.budgets.find(budget => budget.budget_id === id);

        return findId;
    }

    async create({
        name,
        dev_quantity,
        designer_quantity,
        po_quantity,
        sm_quantity,
        min_days,
    }: ICreateBudgetDTO): Promise<Budget> {
        const budget = new Budget();

        Object.assign(budget, {
            budget_id: v4(),
            name,
            dev_quantity,
            designer_quantity,
            po_quantity,
            sm_quantity,
            min_days,
        });

        this.budgets.push(budget);

        return budget;
    }

    async destroy(budget: Budget): Promise<void> {
        this.budgets = this.budgets.filter(
            targetBudget => targetBudget !== budget,
        );
    }

    async save(budget: Budget): Promise<Budget> {
        const findIndex = this.budgets.findIndex(
            findBudget => findBudget.budget_id === budget.budget_id,
        );

        this.budgets[findIndex] = budget;

        return budget;
    }
}

export default BudgetsRepository;
