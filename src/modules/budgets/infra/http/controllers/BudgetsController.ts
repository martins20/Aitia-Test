import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateBudgetService from '@modules/budgets/services/CreateBudgetService';
import ListBudgetsService from '@modules/budgets/services/ListBudgetsService';

export default class UsersController {
    async list(request: Request, response: Response) {
        const getBudgets = container.resolve(ListBudgetsService);

        const budgets = await getBudgets.execute();

        return response.json(budgets);
    }

    async create(request: Request, response: Response) {
        const data = request.body;

        const createBudget = container.resolve(CreateBudgetService);

        const budget = await createBudget.execute(data);

        return response.json(budget);
    }

    async delete(request: Request, response: Response) {}
}
