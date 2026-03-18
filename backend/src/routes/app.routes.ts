import { Router } from 'express';
import { SignageController } from '../controllers/SignageController';
import { ParkingController } from '../controllers/ParkingController';
import { authenticateJWT, authorizeRoles } from '../middlewares/auth.middleware';
import { UserRole } from '../types';

const router = Router();
const signageCtrl = new SignageController();
const parkingCtrl = new ParkingController();

// Signage Routes
router.get('/signage', signageCtrl.getAll);
router.get('/signage/:id', signageCtrl.getOne);
router.post('/signage', authenticateJWT, authorizeRoles(UserRole.ADMIN), signageCtrl.create);
router.put('/signage/:id', authenticateJWT, authorizeRoles(UserRole.ADMIN), signageCtrl.update);
router.delete('/signage/:id', authenticateJWT, authorizeRoles(UserRole.ADMIN), signageCtrl.delete);
router.post('/signage/:deviceId/heartbeat', signageCtrl.heartbeat);

// Parking Routes
router.get('/parking/spaces', parkingCtrl.getAll);
router.get('/parking/spaces/:id', parkingCtrl.getOne);
router.get('/parking/availability', parkingCtrl.getAvailability);
router.post('/parking/spaces', authenticateJWT, authorizeRoles(UserRole.ADMIN), parkingCtrl.create);
router.post('/parking/spaces/:id/sensor-update', parkingCtrl.updateSensor); // Usually authenticated via API Key, here simplified

export default router;
