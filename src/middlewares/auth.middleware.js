import jwt from 'jsonwebtoken';
import ResponseHelper from '../utils/responseHelper.js';

// Middleware que verifica la autenticación del usuario mediante JWT
export const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return ResponseHelper.unauthorized(
            res,
            'Token no proporcionado'
        );
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;
        next();

    } catch (error) {
        return ResponseHelper.unauthorized(
            res,
            'Token inválido o expirado'
        );
    }
};

// Middleware de autorización según rol correspondiente
export const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return ResponseHelper.forbidden(
                res,
                'No tenés permiso para acceder'
            );
        }

        next();
    };
};