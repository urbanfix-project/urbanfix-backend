import * as userService from './user.service.js';
import ResponseHelper from '../../utils/responseHelper.js';

export const getMe = async (req, res) => {
  try {
    const user = await userService.getUserProfile(req.user.id);
    return ResponseHelper.success(res, user, 'Perfil obtenido correctamente');
  } catch (error) {
    if (error.status === 404) {
      return ResponseHelper.notFound(res, error.message);
    }
    console.error('Error en getMe:', error);
    return ResponseHelper.error(res);
  }
};

export const updateMe = async (req, res) => {
  try {
    const updatedUser = await userService.updateUserProfile(req.user.id, req.body);
    return ResponseHelper.success(res, updatedUser, 'Perfil actualizado correctamente');
  } catch (error) {
    if (error.status === 404) {
      return ResponseHelper.notFound(res, error.message);
    }
    if (error.status === 400) {
      return ResponseHelper.badRequest(res, error.message);
    }
    console.error('Error en updateMe:', error);
    return ResponseHelper.error(res);
  }
};