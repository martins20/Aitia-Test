import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FindUserService from '@modules/users/services/FindUserService';

import CreateBudgetService from '@modules/budgets/services/CreateBudgetService';
import ListBudgetsService from '@modules/budgets/services/ListBudgetsService';
import DeleteBudgetService from '@modules/budgets/services/DeleteBudgetService';

export default class UsersController {
    async list(request: Request, response: Response) {
        const { id } = request.user;

        const getBudgets = container.resolve(ListBudgetsService);

        const budgets = await getBudgets.execute(id);

        return response.json(budgets);
    }

    async create(request: Request, response: Response) {
        const data = request.body;
        const { id } = request.user;

        const createBudget = container.resolve(CreateBudgetService);
        const findUser = container.resolve(FindUserService);

        const user = await findUser.execute(id);

        const budget = await createBudget.execute({
            ...data,
            owner_id: user.id,
        });

        return response.json(budget);
    }

    async delete(request: Request, response: Response) {
        const { budget_id } = request.params;
        const { id } = request.user;

        const deleteBudget = container.resolve(DeleteBudgetService);

        await deleteBudget.execute(budget_id, id);

        return response.status(204).json();
    }
}
