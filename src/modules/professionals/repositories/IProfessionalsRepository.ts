import ICreateTotalPrice from '../dtos/ICreateTotalPriceDTO';

export default interface IProfessionalsRepository {
    calculate(data: ICreateTotalPrice): Promise<number>;
}
