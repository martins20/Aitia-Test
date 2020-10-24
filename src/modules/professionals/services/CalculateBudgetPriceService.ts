import 'reflect-metadata';

import { injectable, inject } from 'tsyringe';

import IProfessionalsRepository from '../repositories/IProfessionalsRepository';

interface IRequest {
    designer_quantity: number;
    sm_quantity: number;
    dev_quantity: number;
    po_quantity: number;
    min_days: number;
}

@injectable()
class CalculateBudgetPriceService {
    constructor(
        @inject('ProfessionalsRepository')
        private professionalsRepository: IProfessionalsRepository,
    ) {}

    async execute(data: IRequest): Promise<number> {
        const calculatedTotalPrice = await this.professionalsRepository.calculate(
            data,
        );

        return calculatedTotalPrice;
    }
}

export default CalculateBudgetPriceService;
