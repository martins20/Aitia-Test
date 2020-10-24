import { Router } from 'express';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import UserController from '../controllers/UsersController';

const UsersRouter = Router();

const userController = new UserController();

UsersRouter.post('/', userController.create);
UsersRouter.delete('/:user_id', ensureAuthenticated, userController.delete);

export default UsersRouter;
