import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import BudgetsController from '../controllers/BudgetsController';

const BudgetsRouter = Router();

const budgetsController = new BudgetsController();

BudgetsRouter.use(ensureAuthenticated);

BudgetsRouter.get('/', budgetsController.list);
BudgetsRouter.post('/', budgetsController.create);
BudgetsRouter.delete('/:budget_id', budgetsController.delete);

export default BudgetsRouter;
