const UserRepository = require("../data/user.repository");
const { CustomError } = require("../utils/custom-error.util");
const {
  jwtSign,
  hashPassword,
  isPasswordValid,
} = require("../utils/auth.util");
const { errorMessages } = require("../utils/error-messages.util");
const UserModel = require("../models/user.model");

// A method for logging in
exports.login = async (email, password) => {
  email = email.toLowerCase();
  const user = await UserModel.findOne({ email: email });
  if (user) {
    // check user password with hashed password stored in the database
    if (await isPasswordValid(password, user)) {
      return jwtSign(user);
    } else {
      throw new CustomError(errorMessages.WRONG_PASSWORD, 400);
    }
  } else {
    throw new CustomError(errorMessages.ACCOUNT_NOT_FOUND, 400);
  }
};

// A method for getting a refresh token
exports.refreshToken = async (userId) => {
  try {
    const user = await UserRepository.get(userId);
    return jwtSign(user);
  } catch (err) {
    throw err;
  }
};

// A method for signing up
exports.register = async (
  firstName,
  fatherName,
  grandFatherName,
  phoneNumber,
  email,
  password,
  roles
) => {
  if (await UserRepository.isEmailTaken(email)) {
    throw new CustomError(errorMessages.EMAIL_TAKEN, 400);
  } else {
    email = email.toLowerCase();
    let newUser = new UserModel({
      firstName: firstName,
      fatherName: fatherName,
      grandFatherName: grandFatherName,
      phoneNumber: phoneNumber,
      email: email,
      roles: roles,
    });

    newUser.hashedPassword = await hashPassword(password);
    try {
      await UserRepository.create(newUser);
      return jwtSign(newUser);
    } catch (err) {
      throw err;
    }
  }
};

// A method for updating user's password
exports.updatePassword = async (userId, password) => {
  try {
    let hashedPassword = await hashPassword(password);
    await UserRepository.update(userId, { hashedPassword });
  } catch (err) {
    throw err;
  }
};

// A method for updating user's profile
exports.updateProfile = async (
  userId,
  firstName,
  fatherName,
  grandFatherName,
  email,
  phoneNumber,
  currentPassword,
  newPassword
) => {
  let existingUser = await UserRepository.get(userId);

  if (await isPasswordValid(currentPassword, existingUser)) {
    try {
      let userToUpdate = {};

      if (newPassword) {
        let hashedPassword = await hashPassword(newPassword);
        userToUpdate = { ...userToUpdate, hashedPassword };
      }
      if (firstName) {
        userToUpdate = { ...userToUpdate, firstName };
      }
      if (fatherName) {
        userToUpdate = { ...userToUpdate, fatherName };
      }
      if (grandFatherName) {
        userToUpdate = { ...userToUpdate, grandFatherName };
      }
      if (phoneNumber) {
        userToUpdate = { ...userToUpdate, phoneNumber };
      }
      if (email) {
        if (
          email !== existingUser.email &&
          (await UserRepository.isEmailTaken(email))
        ) {
          throw new CustomError(errorMessages.EMAIL_TAKEN, 400);
        }
        userToUpdate = { ...userToUpdate, email };
      }
      if (Object.keys(userToUpdate).length) {
        await UserRepository.update(userId, userToUpdate);
      }
    } catch (err) {
      throw err;
    }
  } else {
    throw new CustomError(errorMessages.PASSWORDS_DONT_MATCH, 400);
  }
};
