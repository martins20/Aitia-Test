import Budget from '../infra/typeorm/entities/Budget';
import ICreateBudgetDTO from '../dtos/ICreateBudgetDTO';

export default interface IBudgetRepository {
    findById(id: string): Promise<Budget | undefined>;
    create(data: ICreateBudgetDTO): Promise<Budget>;
    list(): Promise<Budget[] | undefined>;
    destroy(data: Budget): Promise<void>;
    save(user: Budget): Promise<Budget>;
}
