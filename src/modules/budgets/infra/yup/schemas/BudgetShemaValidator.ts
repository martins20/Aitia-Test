import * as Yup from 'yup';

import ICreateBudgetDTO from '@modules/budgets/dtos/ICreateBudgetDTO';

const BudgetShemaValidator = Yup.object().shape<ICreateBudgetDTO>({
    name: Yup.string().required('name is required'),
    dev_quantity: Yup.number().required('dev_quantity is required'),
    designer_quantity: Yup.number().required('designer_quantity is required'),
    sm_quantity: Yup.number().required('sm_quantity is required'),
    po_quantity: Yup.number().required('po_quantity is required'),
    min_days: Yup.number()
        .required('min_days is required')
        .min(10, 'min_days quantity must be more than 10'),
});

export default BudgetShemaValidator;
