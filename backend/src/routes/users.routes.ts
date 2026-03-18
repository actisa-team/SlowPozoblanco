import { Router } from 'express';
import { UserController } from '../controllers/UserController';

const router = Router();
const userController = new UserController();

// GET /users - List all users
router.get('/', userController.getAll);

export default router;
