import { Router } from 'express';
import { authenticate } from '../../middlewares/auth.middleware.js';

const router = Router();

// Ruta de ejemplo protegida por autenticación
router.get('/',authenticate,
  (req, res) => {
    res.status(200).json({
      message: 'Ruta de solicitudes disponible'
    });
  }
);

export default router;