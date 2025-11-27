const Joi = require("joi");

const registerSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(9).max(20).required(),
  vacancyId: Joi.number().integer().required()
});

module.exports = { registerSchema };