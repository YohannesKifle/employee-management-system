const EmployeeRepository = require("../data/employee.repository");
const { CustomError } = require("../utils/custom-error.util");
const { errorMessages } = require("../utils/error-messages.util");
const UserModel = require("../models/user.model");
const EmployeeModel = require("../models/employee.model");

// A method creating an employee
exports.create = async (
  firstName,
  fatherName,
  grandFatherName,
  email,
  phoneNumber,
  department,
  position,
  birthDay,
  country,
  homeAddress,
  hiredOn
) => {
  if (await EmployeeRepository.isEmailTaken(email)) {
    throw new CustomError(errorMessages.EMAIL_TAKEN, 400);
  } else {
    email = email.toLowerCase();
    try {
      let newEmployee = new EmployeeModel({
        firstName: firstName,
        fatherName: fatherName,
        grandFatherName: grandFatherName,
        email: email,
        phoneNumber: phoneNumber,
        department: department,
        position: position,
        birthDay: birthDay,
        country: country,
        homeAddress: homeAddress,
        hiredOn: hiredOn,
      });
      try {
        await EmployeeRepository.create(newEmployee);
      } catch (err) {
        throw err;
      }
    } catch {
      throw err;
    }
  }
};

// A method for updating an employee
exports.update = async (
  employeeId,
  firstName,
  fatherName,
  grandFatherName,
  email,
  phoneNumber,
  department,
  position,
  birthDay,
  country,
  homeAddress,
  hiredOn
) => {
  let existingEmployee = await EmployeeRepository.get(employeeId);

  try {
    let employeeToUpdate = {};

    if (firstName) {
      employeeToUpdate = { ...employeeToUpdate, firstName };
    }
    if (fatherName) {
      employeeToUpdate = { ...employeeToUpdate, fatherName };
    }
    if (grandFatherName) {
      employeeToUpdate = { ...employeeToUpdate, grandFatherName };
    }
    if (phoneNumber) {
      employeeToUpdate = { ...employeeToUpdate, phoneNumber };
    }
    if (email) {
      if (
        email !== existingEmployee.email &&
        (await EmployeeRepository.isEmailTaken(email))
      ) {
        throw new CustomError(errorMessages.EMAIL_TAKEN, 400);
      }
      employeeToUpdate = { ...employeeToUpdate, email };
    }
    if (department) {
      employeeToUpdate = { ...employeeToUpdate, department };
    }
    if (position) {
      employeeToUpdate = { ...employeeToUpdate, position };
    }
    if (birthDay) {
      employeeToUpdate = { ...employeeToUpdate, birthDay };
    }
    if (country) {
      employeeToUpdate = { ...employeeToUpdate, country };
    }
    if (homeAddress) {
      employeeToUpdate = { ...employeeToUpdate, homeAddress };
    }
    if (hiredOn) {
      employeeToUpdate = { ...employeeToUpdate, hiredOn };
    }
    if (Object.keys(employeeToUpdate).length) {
      await EmployeeRepository.update(employeeId, employeeToUpdate);
    }
  } catch (err) {
    throw err;
  }
};
