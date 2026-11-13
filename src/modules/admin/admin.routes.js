import { Router } from 'express';
import { authenticate, authorize } from '../../middlewares/auth.middleware.js';

import {
  getAllUsers,
  getAllServiceRequests,
  updateServiceRequestStatus
} from './admin.controller.js';

const router = Router();

// Todas las rutas requieren rol ADMIN
router.use(authenticate, authorize('ADMIN'));

router.get('/users', getAllUsers);

router.get('/service-requests', getAllServiceRequests);

router.patch(
  '/service-requests/:id/status',
  updateServiceRequestStatus
);

export default router;
