import ICreateBudgetDTO from '@modules/budgets/dtos/ICreateBudgetDTO';
import GetValidationErrors from '@shared/errors/GetValidationErrors';
import BudgetShemaValidator from '../schemas/BudgetShemaValidator';
import AppError from '@shared/errors/AppError';

export default async function CheckYupErrors(
    data: ICreateBudgetDTO,
): Promise<void> {
    // check all if data is passed on schema
    await BudgetShemaValidator.validate(data, {
        abortEarly: false,
    }).catch(err => {
        const errors = GetValidationErrors(err);

        throw new AppError(errors);
    });
}
