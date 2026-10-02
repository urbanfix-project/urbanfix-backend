import { Router } from 'express';
import { authenticate, authorize } from '../../middlewares/auth.middleware.js';

const router = Router();

// Ruta de ejemplo protegida por autenticación y autorización
router.get('/users',authenticate,authorize('ADMIN'),
    (req, res) => {
        res.status(200).json({
            message: 'Ruta de administración disponible'
        });
    }
);

export default router;