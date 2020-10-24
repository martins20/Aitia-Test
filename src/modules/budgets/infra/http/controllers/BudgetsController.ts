import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateBudgetService from '@modules/budgets/services/CreateBudgetService';
import ListBudgetsService from '@modules/budgets/services/ListBudgetsService';
import FindUserService from '@modules/users/services/FindUserService';

export default class UsersController {
    async list(request: Request, response: Response) {
        const getBudgets = container.resolve(ListBudgetsService);

        const budgets = await getBudgets.execute();

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

    async delete(request: Request, response: Response) {}
}
