
import { Router } from 'express';

import { createServiceRequest, getMyServiceRequests, getAvailableServiceRequests} from './serviceRequest.controller.js';
import { authenticate, authorize } from '../../middlewares/auth.middleware.js';
import { validateSchema } from '../../middlewares/validateData.js';
import { createServiceRequestSchema } from './serviceRequest.schema.js';

const router = Router();

// Crear una solicitud - Solo CLIENTE
router.post(
  '/',
  authenticate,
  authorize('CLIENTE'),
  validateSchema(createServiceRequestSchema),
  createServiceRequest
);

// Ver mis solicitudes - Solo CLIENTE
router.get(
  '/mine',
  authenticate,
  authorize('CLIENTE'),
  getMyServiceRequests
);

// Ver solicitudes disponibles - Solo TECNICO
router.get(
  '/available',
  authenticate,
  authorize('TECNICO'),
  getAvailableServiceRequests
);

export default router;
