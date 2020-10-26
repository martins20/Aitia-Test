import IProfessionalRepository from '@modules/professionals/repositories/IProfessionalsRepository';
import ICreateTotalPriceDTO from '@modules/budgets/dtos/ICreateBudgetDTO';

import Professional from '@modules/professionals/infra/typeorm/entities/Professional';

class ProfessionalsRepository implements IProfessionalRepository {
    professionals: Professional[] = [
        {
            id: 'asdjfnalksdjfaslkdjfasdf',
            job: 'dev',
            price: 1000,
            tax: 15,
            created_at: Date.now().toString(),
            updated_at: Date.now().toString(),
        },
        {
            id: 'asdjfnalksdjfaslkdjf12df',
            job: 'design',
            price: 1000,
            tax: 5,
            created_at: Date.now().toString(),
            updated_at: Date.now().toString(),
        },
        {
            id: 'asdjfnalksdjfaslkdjfhrdf',
            job: 'sm',
            price: 900,
            tax: 12,
            created_at: Date.now().toString(),
            updated_at: Date.now().toString(),
        },
        {
            id: 'as87fnalksdjfaslkdjfasdf',
            job: 'po',
            price: 1500,
            tax: 10,
            created_at: Date.now().toString(),
            updated_at: Date.now().toString(),
        },
    ];

    async calculate({
        designer_quantity,
        sm_quantity,
        dev_quantity,
        po_quantity,
        min_days,
    }: ICreateTotalPriceDTO): Promise<number> {
        const professionals = await this.professionals.map(
            professional => professional,
        );

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
