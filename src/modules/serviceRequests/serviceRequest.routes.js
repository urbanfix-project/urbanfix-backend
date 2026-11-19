import { Router } from 'express';

import {
  createServiceRequest,
  getMyServiceRequests,
  getAvailableServiceRequests,
  acceptServiceRequest,
  rejectServiceRequest
} from './serviceRequest.controller.js';

import {
  authenticate,
  authorize
} from '../../middlewares/auth.middleware.js';

import { validateSchema } from '../../middlewares/validateData.js';

import {
  createServiceRequestSchema
} from './serviceRequest.schema.js';

const router = Router();

// Crear solicitud - CLIENTE
router.post('/', authenticate, authorize('CLIENTE'), validateSchema(createServiceRequestSchema), createServiceRequest);

// Mis solicitudes - CLIENTE
router.get('/mine', authenticate, authorize('CLIENTE'), getMyServiceRequests);

// Solicitudes disponibles - TECNICO
router.get('/available', authenticate, authorize('TECNICO'), getAvailableServiceRequests);

// Aceptar solicitud - TECNICO
router.patch('/:id/accept', authenticate, authorize('TECNICO'), acceptServiceRequest);

// Rechazar solicitud - TECNICO
router.patch('/:id/reject', authenticate, authorize('TECNICO'), rejectServiceRequest);

export default router;

