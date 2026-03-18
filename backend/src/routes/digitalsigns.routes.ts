import { Router } from 'express';
import { DigitalSignController } from '../controllers/DigitalSignController';

const router = Router();
const controller = new DigitalSignController();

router.get('/', controller.getAll);
router.get('/stats', controller.getStats);

export default router;
