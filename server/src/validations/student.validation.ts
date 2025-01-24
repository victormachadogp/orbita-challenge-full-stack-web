import Joi from "joi";

export const createStudentSchema = Joi.object({
  name: Joi.string().min(3).max(100).required().messages({
    "string.min": "Nome deve ter no mínimo 3 caracteres",
    "string.max": "Nome deve ter no máximo 100 caracteres",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Email inválido",
  }),
  ra: Joi.string()
    .pattern(/^[0-9]+$/)
    .required()
    .messages({
      "string.pattern.base": "RA deve conter apenas números",
      "string.length": "RA deve ter 10 dígitos",
    }),
  cpf: Joi.string()
    .pattern(/^\d{11}$/)
    .required()
    .messages({
      "string.pattern.base": "CPF inválido",
    }),
});

export const updateStudentSchema = Joi.object({
  name: Joi.string().min(3).max(100),
  email: Joi.string().email(),
});
