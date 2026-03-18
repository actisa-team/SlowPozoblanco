import { Router } from 'express';
import authRoutes from './auth.routes';
import tourismResourceRoutes from './tourismResources.routes';
import appRoutes from './app.routes';
import usersRoutes from './users.routes';
import digitalSignsRoutes from './digitalsigns.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/tourism-resources', tourismResourceRoutes);
router.use('/users', usersRoutes);
router.use('/digital-signs', digitalSignsRoutes);
router.use('/', appRoutes);


export default router;
