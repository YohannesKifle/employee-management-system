const EmployeeModel = require("../models/employee.model");
const { CustomError } = require("../utils/custom-error.util");
const { errorMessages } = require("../utils/error-messages.util");

// A method for getting a employee instance by Id
exports.get = async (id) => {
  let existingEmployee = await EmployeeModel.findOne({ _id: id });
  if (!existingEmployee)
    throw new CustomError(errorMessages.ACCOUNT_NOT_FOUND, 400);
  return existingEmployee;
};

// A method for getting a employee instance by email
exports.getByEmail = async (email) => {
  let existingEmployee = await EmployeeModel.findOne({ email: email });
  if (!existingEmployee)
    throw new CustomError(errorMessages.ACCOUNT_NOT_FOUND, 400);
  return existingEmployee;
};

// A method for getting paginated employee instances
exports.getAll = async (pageSize, skip) => {
  return EmployeeModel.find({}).skip(skip).limit(pageSize);
};

// A method for getting un paginated employee instances
exports.getAllUnpaginated = async (pageSize, skip) => {
  return EmployeeModel.find({});
};

// A method for getting count of employee instances
exports.getCount = async () => {
  return EmployeeModel.count({});
};

// A method for checking  if email is already taken
exports.isEmailTaken = async (email) => {
  email = email.toLowerCase();
  return (
    (await EmployeeModel.findOne({
      email: email,
    })) !== null
  );
};

// A method for creating a employee instance
exports.create = async (newEmployee) => {
  await newEmployee.save((err, employee) => {
    if (err) {
      throw err;
    }
  });
};

// A method for updating employee instance
exports.update = async (id, updatedEmployee) => {
  try {
    await EmployeeModel.findOneAndUpdate({ _id: id }, updatedEmployee);
  } catch (err) {
    throw err;
  }
};

// A method for deleting one employee instance
exports.deleteOne = async (id) => {
  try {
    await EmployeeModel.deleteOne({ _id: id });
  } catch (err) {
    throw err;
  }
};
