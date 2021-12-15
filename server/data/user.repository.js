const UserModel = require("../models/user.model");
const { CustomError } = require("../utils/custom-error.util");
const { errorMessages } = require("../utils/error-messages.util");

// A method for getting a user instance by Id
exports.get = async (id) => {
  let existingUser = await UserModel.findOne({ _id: id });
  if (!existingUser)
    throw new CustomError(errorMessages.ACCOUNT_NOT_FOUND, 400);
  return existingUser;
};

// A method for getting a user instance by email
exports.getByEmail = async (email) => {
  let existingUser = await UserModel.findOne({ email: email });
  if (!existingUser)
    throw new CustomError(errorMessages.ACCOUNT_NOT_FOUND, 400);
  return existingUser;
};

// A method for getting paginated user instances
exports.getAll = async (pageSize, skip) => {
  return UserModel.find({}).skip(skip).limit(pageSize);
};

// A method for getting un paginated user instances
exports.getAllUnpaginated = async (pageSize, skip) => {
  return UserModel.find({});
};

// A method for getting count of user instances
exports.getCount = async () => {
  return UserModel.count({});
};

// A method for checking  if email is already taken
exports.isEmailTaken = async (email) => {
  email = email.toLowerCase();
  return (
    (await UserModel.findOne({
      email: email,
    })) !== null
  );
};

// A method for creating a user instance
exports.create = async (newUser) => {
  await newUser.save((err, user) => {
    if (err) {
      throw err;
    }
  });
};

// A method for updating user instance
exports.update = async (id, updatedUser) => {
  try {
    await UserModel.findOneAndUpdate({ _id: id }, updatedUser);
  } catch (err) {
    throw err;
  }
};

// A method for deleting one user instance
exports.deleteOne = async (id) => {
  try {
    await UserModel.deleteOne({ _id: id });
  } catch (err) {
    throw err;
  }
};
