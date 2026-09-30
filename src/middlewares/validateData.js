import ResponseHelper from '../utils/responseHelper.js';

export const validateSchema = (schema) => {
  return (req, res, next) => {
    // abortEarly: false permite que Joi devuelva TODOS los errores de una vez y no el primero que encuentre
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const errors = error.details.map((err) => ({
        field: err.path[0],
        message: err.message,
      }));

      // Devuelve un 400 Bad Request estructurado
      return ResponseHelper.validationError(res, errors);
    }

    // La petición sigue su curso hacia el controlador
    next();
  };
};