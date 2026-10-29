
import * as serviceRequestService from './serviceRequest.service.js';
import ResponseHelper from '../../utils/responseHelper.js';

// Crear una solicitud (CLIENTE)
export const createServiceRequest = async (req, res) => {
  try {
    const solicitud = await serviceRequestService.createServiceRequest(
      req.user.id,
      req.body
    );

    return ResponseHelper.created(
      res,
      solicitud,
      'Solicitud creada correctamente'
    );
  } catch (error) {
    console.error('Error en createServiceRequest:', error);
    return ResponseHelper.error(res);
  }
};

// Obtener mis solicitudes (CLIENTE)
export const getMyServiceRequests = async (req, res) => {
  try {
    const solicitudes = await serviceRequestService.getMyServiceRequests(
      req.user.id
    );

    return ResponseHelper.success(
      res,
      solicitudes,
      'Solicitudes obtenidas correctamente'
    );
  } catch (error) {
    console.error('Error en getMyServiceRequests:', error);
    return ResponseHelper.error(res);
  }
};

// Obtener solicitudes disponibles (TECNICO)
export const getAvailableServiceRequests = async (req, res) => {
  try {
    // Consultamos la profesión del técnico autenticado
    const tecnico = await serviceRequestService.getTechnicianProfession(
      req.user.id
    );

    if (!tecnico || !tecnico.profession) {
      return ResponseHelper.badRequest(
        res,
        'El técnico debe tener una profesión asignada'
      );
    }

    const solicitudes =
      await serviceRequestService.getAvailableServiceRequests(
        tecnico.profession
      );

    return ResponseHelper.success(
      res,
      solicitudes,
      'Solicitudes disponibles obtenidas correctamente'
    );
  } catch (error) {
    console.error('Error en getAvailableServiceRequests:', error);
    return ResponseHelper.error(res);
  }
};
