const { Joi } = require("express-validation");

// Request body validator for login
const loginValidation = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
      .regex(/[a-zA-Z0-9]{3,30}/)
      .min(8)
      .max(25)
      .required(),
  }),
};

// Request body validator for profile
const profileValidation = {
  body: Joi.object({
    firstName: Joi.string().min(1).required(),
    fatherName: Joi.string().min(1).required(),
    grandFatherName: Joi.string().min(1).required(),
    email: Joi.string().email().required(),
    phoneNumber: Joi.string().required(),
    password: Joi.string()
      .regex(/[a-zA-Z0-9]{3,30}/)
      .min(8)
      .max(25)
      .required(),
    roles: Joi.array().items(Joi.string()).required(),
  }),
};

// Request body validator for profile
const profileUpdateValidation = {
  body: Joi.object({
    firstName: Joi.string().min(1).required(),
    fatherName: Joi.string().min(1).required(),
    grandFatherName: Joi.string().min(1).required(),
    email: Joi.string().email().required(),
    phoneNumber: Joi.string().required(),
    currentPassword: Joi.string()
      .regex(/[a-zA-Z0-9]{3,30}/)
      .min(8)
      .max(25)
      .required(),
    newPassword: Joi.string()
      .regex(/[a-zA-Z0-9]{3,30}/)
      .min(8)
      .max(25)
      .required(),
    roles: Joi.array().items(Joi.string()).required(),
  }),
};

module.exports = {
  loginValidation,
  profileValidation,
  profileUpdateValidation,
};
