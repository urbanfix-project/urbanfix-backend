
import Joi from 'joi';

export const createServiceRequestSchema = Joi.object({
  title: Joi.string()
    .trim()
    .min(5)
    .max(100)
    .required()
    .messages({
      'string.empty': 'El título es obligatorio',
      'string.min': 'El título debe tener al menos 5 caracteres',
      'string.max': 'El título no puede exceder los 100 caracteres',
      'any.required': 'El título es obligatorio',
    }),

  description: Joi.string()
    .trim()
    .min(10)
    .max(1000)
    .required()
    .messages({
      'string.empty': 'La descripción es obligatoria',
      'string.min': 'La descripción debe tener al menos 10 caracteres',
      'string.max': 'La descripción no puede exceder los 1000 caracteres',
      'any.required': 'La descripción es obligatoria',
    }),

  requiredProfession: Joi.string()
    .valid(
      'ELECTRICISTA',
      'PLOMERO',
      'GASISTA',
      'TECNICO_AC',
      'CERRAJERO',
      'ALBANIL'
    )
    .required()
    .messages({
      'any.only': 'La profesión seleccionada no es válida',
      'any.required': 'La profesión es obligatoria',
    }),
});
