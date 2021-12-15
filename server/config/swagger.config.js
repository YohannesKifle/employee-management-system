const swaggerJsdoc = require("swagger-jsdoc");
const { BACKEND_URL } = require("./secrets.config");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Employee Management System API Swagger documentation",
      version: "1.0",
      description: "Documentation of Employee Management System API",
      license: {
        name: "Proprietary",
      },
      contact: {
        name: "Nebiyou Hailemariam",
        url: "https://nebhailemariam.yolasite.com/",
        email: "nebhailemariam@gmail.com",
      },
    },
    servers: [
      {
        url: `${BACKEND_URL}/api/v1`,
        description: "Server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./controllers/*.controller.js"],
};

const swaggerSpecs = swaggerJsdoc(options);

module.exports = swaggerSpecs;
