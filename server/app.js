const express = require("express");
const app = express();
const morgan = require("morgan");
const { ValidationError } = require("express-validation");
const { CustomError } = require("./utils/custom-error.util");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerSpecs = require("./config/swagger.config");
const { errorMessages } = require("./utils/error-messages.util");
const { CLIENT_URL } = require("./config/secrets.config");

// Enable logging
app.use(morgan("tiny"));

// Enable cors
var corsOptions = {
  origin: [CLIENT_URL],
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Adding body parser
app.use(express.json());

// Add routes
const usersRouter = require("./controllers/users.controller");
const employeesRouter = require("./controllers/employees.controller");
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/employees", employeesRouter);

// Add swagger doc
app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Global error handler
app.use(function (err, req, res, next) {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json(err);
  }
  if (err instanceof CustomError) {
    return res.status(err.statusCode()).json({ message: err.message });
  }
  console.log(err);
  return res.status(500).json({ message: errorMessages.INTERNAL_SERVER_ERROR });
});

module.exports = {
  app,
};
