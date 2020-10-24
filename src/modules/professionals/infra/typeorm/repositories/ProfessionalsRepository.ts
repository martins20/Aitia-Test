import { getRepository, Repository } from 'typeorm';

import IProfessionalRepository from '@modules/professionals/repositories/IProfessionalsRepository';
import ICreateTotalPriceDTO from '@modules/budgets/dtos/ICreateTotalPriceDTO';

import Professional from '../entities/Professional';

class ProfessionalsRepository implements IProfessionalRepository {
    private ormRepository: Repository<Professional>;

    constructor() {
        this.ormRepository = getRepository(Professional);
    }

    async calculate({
        designer_quantity,
        sm_quantity,
        dev_quantity,
        po_quantity,
        min_days,
    }: ICreateTotalPriceDTO): Promise<number> {
        const professionals = await this.ormRepository.find();
        const quantities: number[] = [
            designer_quantity,
            sm_quantity,
            dev_quantity,
            po_quantity,
        ];

        const [calculatedPriceOfProfessionals] = professionals.map(
            professional => {
                const professionalPrice = quantities.map(
                    professional_quantity => {
                        let total = professional_quantity * professional.price;
                        total += total * (professional.tax / 100);
                        return total * min_days;
                    },
                );

                return professionalPrice;
            },
        );

        const calculatedTotalBudgetPrice = calculatedPriceOfProfessionals.reduce(
            (a, b) => a + b,
            200 * min_days,
        );

        return calculatedTotalBudgetPrice;
    }
}

export default ProfessionalsRepository;
