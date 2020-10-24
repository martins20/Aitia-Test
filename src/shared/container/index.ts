import { container } from 'tsyringe';

import '@modules/users/providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IBudgetsRepository from '@modules/budgets/repositories/IBudgetsRepository';
import BudgetsRepository from '@modules/budgets/infra/typeorm/repositories/BudgetsRepository';

import IProfessionalsRepository from '@modules/professionals/repositories/IProfessionalsRepository';
import ProfessionalRepository from '@modules/professionals/infra/typeorm/repositories/ProfessionalsRepository';

container.registerSingleton<IUsersRepository>(
    'UsersRepository',
    UsersRepository,
);

container.registerSingleton<IBudgetsRepository>(
    'BudgetsRepository',
    BudgetsRepository,
);

container.registerSingleton<IProfessionalsRepository>(
    'ProfessionalsRepository',
    ProfessionalRepository,
);
