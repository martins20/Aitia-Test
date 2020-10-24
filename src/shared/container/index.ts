import { container } from 'tsyringe';

import '@modules/users/providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IBudgetsRepository from '@modules/budgets/repositories/IBudgetsRepository';
import BudgetsRepository from '@modules/budgets/infra/typeorm/repositories/BudgetsRepository';

container.registerSingleton<IUsersRepository>(
    'UsersRepository',
    UsersRepository,
);

container.registerSingleton<IBudgetsRepository>(
    'BudgetsRepository',
    BudgetsRepository,
);
