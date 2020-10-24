import { Router } from 'express';

import UsersRouter from '@modules/users/infra/http/routes/users.routes';
import SessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import BudgetsRouter from '@modules/budgets/infra/http/routes/budgets.routes';

const routes = Router();

routes.use('/users', UsersRouter);
routes.use('/sessions', SessionsRouter);
routes.use('/budgets', BudgetsRouter);

export default routes;
