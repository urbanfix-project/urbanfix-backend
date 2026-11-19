
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


// Aceptar una solicitud de servicio (TECNICO)
export const acceptServiceRequest = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await serviceRequestService.acceptServiceRequest(
      id,
      req.user.id
    );

    if (result.error === 'NOT_FOUND') {
      return ResponseHelper.notFound(
        res,
        'Solicitud no encontrada'
      );
    }

    if (result.error === 'NO_PROFESSION') {
      return ResponseHelper.badRequest(
        res,
        'El técnico debe tener una profesión asignada'
      );
    }

    if (result.error === 'WRONG_PROFESSION') {
      return ResponseHelper.forbidden(
        res,
        'La solicitud no corresponde a tu profesión'
      );
    }

    if (result.error === 'NOT_AVAILABLE') {
      return ResponseHelper.conflict(
        res,
        'Esta solicitud ya no está disponible'
      );
    }

    return ResponseHelper.success(
      res,
      result.data,
      'Solicitud aceptada correctamente'
    );
  } catch (error) {
    console.error('Error al aceptar solicitud:', error);
    return ResponseHelper.error(res);
  }
};

// Rechazar una solicitud de servicio (TECNICO)
export const rejectServiceRequest = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await serviceRequestService.rejectServiceRequest(
      id,
      req.user.id
    );

    if (result.error === 'NOT_FOUND') {
      return ResponseHelper.notFound(
        res,
        'Solicitud no encontrada'
      );
    }

    if (result.error === 'FORBIDDEN') {
      return ResponseHelper.forbidden(
        res,
        'No tenés permiso para rechazar esta solicitud'
      );
    }

    if (result.error === 'INVALID_STATUS') {
      return ResponseHelper.conflict(
        res,
        'La solicitud no está en estado ACEPTADA'
      );
    }

    return ResponseHelper.success(
      res,
      result.data,
      'Solicitud rechazada correctamente'
    );
  } catch (error) {
    console.error('Error al rechazar solicitud:', error);
    return ResponseHelper.error(res);
  }
};
