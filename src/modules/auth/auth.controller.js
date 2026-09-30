import * as authService from './auth.service.js';
import ResponseHelper from '../../utils/responseHelper.js';

export const register = async (req, res) => {
  try {
    const result = await authService.registerUser(req.body);
    
    return ResponseHelper.created(res, result, 'Usuario registrado exitosamente');
      
  } catch (error) {
    
    if (error.status === 409) {
      return ResponseHelper.conflict(res, error.message);
    }
    
    console.error('Error en register:', error);
    return ResponseHelper.error(res, error.message, error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body; // Solo extraer lo necesario para el servicio

    const result = await authService.loginUser(email, password);
    
    return ResponseHelper.success(res, result, 'Inicio de sesión exitoso');
      
  } catch (error) {
    if (error.status === 401) {
      return ResponseHelper.unauthorized(res, error.message);
    }
    
    console.error('Error en login:', error);
    return ResponseHelper.error(res);
  }
};