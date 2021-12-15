const { Joi } = require("express-validation");

// Request body validator for profile
const employeeValidation = {
  body: Joi.object({
    firstName: Joi.string().min(1).required(),
    fatherName: Joi.string().min(1).required(),
    grandFatherName: Joi.string().min(1).required(),
    email: Joi.string().email().required(),
    phoneNumber: Joi.string().required(),
    department: Joi.string().required(),
    position: Joi.string().required(),
    birthDay: Joi.string().required(),
    country: Joi.string().required(),
    homeAddress: Joi.string().required(),
    hiredOn: Joi.string().required(),
  }),
};

module.exports = { employeeValidation };
