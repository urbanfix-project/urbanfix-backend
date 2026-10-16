import express from 'express';
import authRoutes from './modules/auth/auth.routes.js';
import serviceRequestRoutes from './modules/serviceRequests/serviceRequest.routes.js';
import adminRoutes from './modules/admin/admin.routes.js';
import userRoutes from './modules/users/user.routes.js';

const router = express.Router();

// Rutas de autenticación
router.use('/auth', authRoutes);

// Rutas de solicitudes de servicio
router.use('/service-requests', serviceRequestRoutes);

// Rutas de admin
router.use('/admin', adminRoutes);

router.use('/users', userRoutes);

export default router;