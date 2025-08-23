const Joi = require('joi');

const registerSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.base': "Ism matn bo'lishi kerak",
    'any.required': "Ism kiritish majburiy",
  }),
  email: Joi.string().email().required().messages({
    'string.email': "Noto'g'ri email formati",
    'any.required': "Email kiritish majburiy",
  }),
  password: Joi.string().min(6).required().messages({
    'string.base': "Parol matn bo'lishi kerak",
    'string.min': "Parol kamida 6 ta belgidan iborat bo'lishi kerak",
    'any.required': "Parol kiritish majburiy",
  }),
//   phone: Joi.string().pattern(/^\+[1-9]\d{1,14}$/).optional().messages({
//     'string.pattern.base': "Telefon raqami E.164 formatida bo'lishi kerak (masalan, +998901234567)",
//   }),
});



const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': "Noto'g'ri email formati",
    'any.required': "Email kiritish majburiy",
  }),
  password: Joi.string().required().messages({
    'string.base': "Parol matn bo'lishi kerak",
    'any.required': "Parol kiritish majburiy",
  }),
});

/* example controller da foydalanish uchun

    const { email, password } = req.body;

    // Validate request body using Joi
    const { error } = loginSchema.validate({ email, password });
    if (error) {
      return errorResponse(res, 400, error.details[0].message);
    }
*/      

module.exports = { registerSchema, loginSchema };