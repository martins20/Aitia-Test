import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Budget from '../infra/typeorm/entities/Budget';
import IBudgetRepository from '../repositories/IBudgetsRepository';
import CheckYupErrors from '../infra/yup/errors/CheckYupErrors';

interface IRequest {
    name: string;
    dev_quantity: number;
    designer_quantity: number;
    sm_quantity: number;
    po_quantity: number;
    min_day: number;
}

@injectable()
class CreateBudgetService {
    constructor(
        @inject('BudgetsRepository')
        private budgetsRepository: IBudgetRepository,
    ) {}

    async execute(data: IRequest): Promise<Budget> {
        // Validate request
        await CheckYupErrors(data);

        const budget = this.budgetsRepository.create(data);

        return budget;
    }
}

export default CreateBudgetService;
