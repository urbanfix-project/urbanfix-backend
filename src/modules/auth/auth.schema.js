import Joi from 'joi';

export const registerSchema = Joi.object({
  name: Joi.string().min(2).max(100).required().messages({
    'string.empty': 'El nombre es obligatorio',
    'string.min': 'El nombre debe tener al menos 3 caracteres',
    'string.max': 'El nombre no puede exceder los 100 caracteres',
  }),
  email: Joi.string().email().max(120).required().messages({
    'string.empty': 'El email es obligatorio',
    'string.email': 'Debe ser un correo electrónico válido',
    'string.max': 'El email no puede exceder los 120 caracteres',
  }),
  password: Joi.string().min(8).max(72).pattern(new RegExp(/^(?=.*[a-zñ])(?=.*[A-ZÑ])(?=.*\d)[A-Za-zñÑ\d]{8,}$/)).required().messages({
    'string.empty': 'La contraseña es obligatoria',
    'string.min': 'La contraseña debe tener al menos 8 caracteres',
    'string.max': 'La contraseña debe tener un maximo de 72 caracteres',
    'string.pattern.base': 'La contraseña debe contener 1 letra mayúscula, 1 minúscula y minimo un número y no puede contener caracteres especiales'
  }),
  phone: Joi.string().pattern(/^[0-9+\-\s()]{8,20}$/).optional().allow(null, '').messages({
    'string.pattern.base': 'El teléfono debe contener entre 8 y 20 caracteres numéricos válidos',
  }),
  role: Joi.string().valid('CLIENTE', 'TECNICO').optional().messages({
    'any.only': 'El rol debe ser CLIENTE o TECNICO',
  }),
  profession: Joi.string()
    .valid('ELECTRICISTA', 'PLOMERO', 'GASISTA', 'TECNICO_AC', 'CERRAJERO', 'ALBANIL')
    .when('role', {
      is: 'CLIENTE',
      then: Joi.forbidden().messages({
        'any.unknown': 'Un usuario con rol CLIENTE no puede tener una profesión asignada',
      }),
      otherwise: Joi.optional().allow(null),
    })
    .messages({
      'any.only': 'La profesión seleccionada no es válida',
    }),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.empty': 'El email es obligatorio',
    'string.email': 'Debe ser un correo electrónico válido',
  }),
  password: Joi.string().required().messages({
    'string.empty': 'La contraseña es obligatoria',
  }),
});