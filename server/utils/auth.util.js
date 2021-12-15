const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { SECRET, REFRESH_TOKEN_SECRET } = require("../config/secrets.config");

// A method for generating JWT tokens
exports.jwtSign = async (user) => {
  return {
    token: jwt.sign(
      {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        roles: user.roles,
      },
      SECRET,
      { expiresIn: "30d" }
    ),
    refreshToken: jwt.sign(
      {
        _id: user._id,
      },
      REFRESH_TOKEN_SECRET,
      { expiresIn: "180d" }
    ),
  };
};

// A method for hashing password
exports.hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  let hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

// A method for comparing user's password with hashed user's password
exports.isPasswordValid = async (password, user) => {
  return await bcrypt.compare(password, user.hashedPassword);
};
