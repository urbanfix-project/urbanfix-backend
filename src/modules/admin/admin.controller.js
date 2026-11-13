import * as adminService from './admin.service.js';
import ResponseHelper from '../../utils/responseHelper.js';

const validStatuses = [
  'PENDIENTE',
  'ACEPTADA',
  'EN_PROGRESO',
  'COMPLETADA',
  'RECHAZADA',
  'CANCELADA'
];

// Listar usuarios
export const getAllUsers = async (req, res) => {
  try {
    const users = await adminService.getAllUsers();

    return ResponseHelper.success(
      res, users, 'Usuarios obtenidos correctamente'
    );
  } catch (error) {
    console.error(error);
    return ResponseHelper.error(res);
  }
};

// Listar solicitudes
export const getAllServiceRequests = async (req, res) => {
  try {
    const { status } = req.query;

    if (status && !validStatuses.includes(status)) {
      return ResponseHelper.badRequest(res, 'Estado inválido');
    }

    const requests =
      await adminService.getAllServiceRequests(status);

    return ResponseHelper.success(
      res, requests, 'Solicitudes obtenidas correctamente'
    );
  } catch (error) {
    console.error(error);
    return ResponseHelper.error(res);
  }
};

// Cambiar estado de solicitud
export const updateServiceRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body ?? {};

    if (!validStatuses.includes(status)) {
      return ResponseHelper.badRequest(res, 'Estado inválido');
    }

    const updated =
      await adminService.updateServiceRequestStatus(id, status);

    return ResponseHelper.success(
      res, updated, 'Estado actualizado correctamente'
    );
  } catch (error) {
    if (error.code === 'P2025') {
      return ResponseHelper.notFound(
        res, 'Solicitud no encontrada'
      );
    }

    console.error(error);
    return ResponseHelper.error(res);
  }
};
