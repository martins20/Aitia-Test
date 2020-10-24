import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FindUserService from '@modules/users/services/FindUserService';

import CreateBudgetService from '@modules/budgets/services/CreateBudgetService';
import ShowBudgetService from '@modules/budgets/services/ShowBudgetService';
import ListBudgetsService from '@modules/budgets/services/ListBudgetsService';
import DeleteBudgetService from '@modules/budgets/services/DeleteBudgetService';
import CalculateBudgetPriceService from '@modules/professionals/services/CalculateBudgetPriceService';

export default class UsersController {
    async show(request: Request, response: Response) {
        const { budget_id } = request.params;
        const { id } = request.user;

        const getBudget = container.resolve(ShowBudgetService);

        const budget = await getBudget.execute(budget_id, id);

        delete budget?.User;

        return response.json(budget);
    }

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
        const getBudgetPrice = container.resolve(CalculateBudgetPriceService);

        const user = await findUser.execute(id);

        const {
            designer_quantity,
            sm_quantity,
            po_quantity,
            min_days,
            dev_quantity,
        } = data;

        const totalBudgetPrice = await getBudgetPrice.execute({
            designer_quantity,
            sm_quantity,
            po_quantity,
            min_days,
            dev_quantity,
        });

        const budget = await createBudget.execute({
            ...data,
            owner_id: user.id,
            budget_price: totalBudgetPrice,
        });

        return response.json(budget);
    }

    async delete(request: Request, response: Response) {
        const { budget_id } = request.params;

        const deleteBudget = container.resolve(DeleteBudgetService);

        await deleteBudget.execute(budget_id);

        return response.status(204).json();
    }
}
