import { Router } from 'express';

import UserController from '../controllers/UsersController';

const UsersRouter = Router();

const userController = new UserController();

UsersRouter.post('/', userController.create);
UsersRouter.delete('/:user_id', userController.delete);

export default UsersRouter;
