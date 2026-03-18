import { Router } from 'express';
import { UserController } from '../controllers/UserController';

const router = Router();
const userController = new UserController();

// GET /users - List all users
router.get('/', userController.getAll);

// PUT /users/:id - Update user
router.put('/:id', userController.update);

// DELETE /users/:id - Delete user
router.delete('/:id', userController.delete);

export default router;
