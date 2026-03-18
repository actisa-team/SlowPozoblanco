import { Router } from 'express';
import { TourismResourceController } from '../controllers/TourismResourceController';
import { authenticateJWT, authorizeRoles } from '../middlewares/auth.middleware';
import { UserRole } from '../types';
import { uploadMiddleware } from '../middleware/upload.middleware';

const router = Router();
const controller = new TourismResourceController();


// Public

/**
 * @swagger
 * /tourism-resources:
 *   get:
 *     summary: Get all tourism resources
 *     tags: [TourismResources]
 *     responses:
 *       200:
 *         description: List of tourism resources
 */
router.get('/', controller.getAll);

/**
 * @swagger
 * /tourism-resources/nearby:
 *   get:
 *     summary: Find nearby tourism resources
 *     tags: [TourismResources]
 *     parameters:
 *       - in: query
 *         name: lat
 *         schema:
 *           type: number
 *         description: Latitude
 *       - in: query
 *         name: lng
 *         schema:
 *           type: number
 *         description: Longitude
 *     responses:
 *       200:
 *         description: List of nearby tourism resources
 */
router.get('/nearby', controller.getNearby);

/**
 * @swagger
 * /tourism-resources/{id}:
 *   get:
 *     summary: Get tourism resource by ID
 *     tags: [TourismResources]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tourism resource details
 *       404:
 *         description: Tourism resource not found
 */
router.get('/:id', controller.getOne);

// Protected (Admin/Manager)
router.post('/', authenticateJWT, authorizeRoles(UserRole.ADMIN, UserRole.MANAGER), controller.create);
router.patch('/:id', authenticateJWT, authorizeRoles(UserRole.ADMIN, UserRole.MANAGER), controller.update);
router.delete('/:id', authenticateJWT, authorizeRoles(UserRole.ADMIN), controller.delete);

// Media upload/delete routes
router.post(
    '/:id/media',
    authenticateJWT,
    authorizeRoles(UserRole.ADMIN, UserRole.MANAGER),
    uploadMiddleware.array('files', 10), // Max 10 files per request
    controller.uploadMedia
);

router.delete(
    '/:id/media/:filename',
    authenticateJWT,
    authorizeRoles(UserRole.ADMIN, UserRole.MANAGER),
    controller.deleteMedia
);

export default router;
