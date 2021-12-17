const { Joi } = require("express-validation");
const jsonwebtoken = require("jsonwebtoken");
const { SECRET, REFRESH_TOKEN_SECRET } = require("../config/secrets.config");
const { CustomError } = require("../utils/custom-error.util");
const { errorMessages } = require("../utils/error-messages.util");

// Authentication middleware
const auth = (req, res, next) => {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    jsonwebtoken.verify(
      req.headers.authorization.split(" ")[1],
      SECRET,
      function (err, decode) {
        if (err) {
          next(new CustomError(errorMessages.UNAUTHENTICATED, 401));
        } else {
          user = decode;
          req.user = user;
          next();
        }
      }
    );
  } else {
    next(new CustomError(errorMessages.UNAUTHENTICATED, 401));
  }
};

// Role based authentication middleware
const roleBasedAuth = (roles) => {
  return (req, res, next) => {
    if (
      req.headers &&
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
      jsonwebtoken.verify(
        req.headers.authorization.split(" ")[1],
        SECRET,
        function (err, decode) {
          if (err) {
            next(new CustomError(errorMessages.UNAUTHENTICATED, 401));
          } else {
            user = decode;
            req.user = user;

            if (!user.roles.some((r) => roles.includes(r)))
              next(
                new CustomError(
                  errorMessages.USER_DOES_NOT_HAVE_ACCESS_PRIVILEGES,
                  403
                )
              );
            else next();
          }
        }
      );
    } else {
      next(new CustomError(errorMessages.UNAUTHENTICATED, 401));
    }
  };
};

// Request body validator for refresh tokens
const refreshTokenValidation = {
  body: Joi.object({
    refreshToken: Joi.string().required(),
  }),
};

//A middleware for validating refresh tokens
const validateRefreshToken = (req, res, next) => {
  jsonwebtoken.verify(
    req.body.refreshToken,
    REFRESH_TOKEN_SECRET,
    function (err, decode) {
      if (err) {
        next(new CustomError(errorMessages.INVALID_REFRESH_TOKEN, 401));
      } else {
        user = decode;
        req.user = user;
        next();
      }
    }
  );
};

// Request params id validator
const idValidation = {
  params: Joi.object({
    id: Joi.string().length(24).required(),
  }),
};

// File validator
const fileValidator = (req, res, next) => {
  if (!req.file) {
    next(new CustomError(errorMessages.ATTACH_FILE, 400));
    return;
  }
  next(null, true);
};

// Set default pagination values if conditions not satisfied
const paginationQueryParameter = (req, res, next) => {
  req.query.page = parseInt(req.query.page) || 1;
  req.query.pageSize = Math.min(parseInt(req.query.pageSize) || 1000, 1000);
  req.query.skip = (req.query.page - 1) * req.query.pageSize; // For page 1, the skip is: (1 - 1) * 20 => 0 * 20 = 0
  next();
};

// Request query validator for pagination
const paginationQueryValidation = {
  query: Joi.object({
    page: Joi.number(),
    pageSize: Joi.number(),
  }).unknown(),
};

module.exports = {
  auth,
  fileValidator,
  idValidation,
  paginationQueryParameter,
  paginationQueryValidation,
  refreshTokenValidation,
  roleBasedAuth,
  validateRefreshToken,
};
