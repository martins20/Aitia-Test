import ICreateBudgetDTO from '../dtos/ICreateBudgetDTO';

import Budget from '../infra/typeorm/entities/Budget';

export default interface IBudgetRepository {
    findById(id: string): Promise<Budget | undefined>;
    create(data: ICreateBudgetDTO): Promise<Budget>;
    list(id: string): Promise<Budget[] | undefined>;
    destroy(data: Budget): Promise<void>;
    save(user: Budget): Promise<Budget>;
}
