import Joi from 'joi';

export const updateProfileSchema = Joi.object({
  name: Joi.string().min(2).max(100).optional().messages({
    'string.empty': 'El nombre no puede estar vacío',
    'string.min': 'El nombre debe tener al menos 2 caracteres',
    'string.max': 'El nombre no puede exceder los 100 caracteres',
    'string.base': 'El nombre debe ser una cadena de texto',
  }),
  phone: Joi.string().pattern(/^[0-9+\-\s()]{8,20}$/).allow(null).optional().messages({
    'string.pattern.base': 'El teléfono debe tener un formato válido (entre 8 y 20 dígitos)',
  }),
  profession: Joi.string()
    .valid('ELECTRICISTA', 'PLOMERO', 'GASISTA', 'TECNICO_AC', 'CERRAJERO', 'ALBANIL')
    .allow(null)
    .optional()
    .messages({
      'any.only': 'La profesión seleccionada no es válida',
    }),
}).min(1).messages({
  'object.min': 'Debes proporcionar al menos un campo válido para actualizar',
});