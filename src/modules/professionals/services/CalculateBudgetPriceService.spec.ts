import FakeProfessionalRepository from '../repositories/fakes/FakeProfessionalsRepository';
import CalculateBudgetPriceService from './CalculateBudgetPriceService';

describe('CalculateBudgetPriceService', () => {
    it('should be able to calculate total price of a budget', async () => {
        const fakeProfessionalRepository = new FakeProfessionalRepository();

        const calculatePrice = new CalculateBudgetPriceService(
            fakeProfessionalRepository,
        );

        const calculatedPrice = await calculatePrice.execute({
            designer_quantity: 1,
            dev_quantity: 1,
            min_days: 10,
            po_quantity: 1,
            sm_quantity: 1,
        });

        expect(calculatedPrice).toBe(48000);
    });
});
