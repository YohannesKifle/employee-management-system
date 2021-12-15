const express = require("express");
const router = express.Router();
const {
  auth,
  idValidation,
  paginationQueryParameter,
  paginationQueryValidation,
  roleBasedAuth,
  validateRefreshToken,
} = require("../middlewares/common.middleware");
const { employeeValidation } = require("../middlewares/employee.middleware");
const { validate } = require("express-validation");

const EmployeeService = require("../services/employee.service");
const EmployeeRepository = require("../data/employee.repository");
const RoleType = require("../types/role.types");

/**
 * @swagger
 * /employees/{id}:
 *   get:
 *     summary: Get employee by Id
 *     description: An endpoint for retrieving an employee by Id.
 *     tags:
 *       [Employees]
 *     parameters:
 *      - in: path
 *        name: id
 *        type: string
 *        required: false
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.get(
  "/:id",
  roleBasedAuth([RoleType.Admin]),
  validate(idValidation),
  async (req, res, next) => {
    try {
      let employee = await EmployeeRepository.get(req.params.id);
      res.json(employee);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @swagger
 * /employees:
 *   get:
 *     summary: Get employees
 *     description: An endpoint for retrieving employees.
 *     tags:
 *       [Employees]
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.get("/", roleBasedAuth([RoleType.Admin]), async (req, res, next) => {
  try {
    let employees = await EmployeeRepository.getAllUnpaginated();
    res.json(employees);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /employees:
 *   post:
 *     summary: Create employee
 *     description: An endpoint for creating an employee.
 *     tags:
 *       [Employees]
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 */
router.post(
  "/",
  roleBasedAuth([RoleType.Admin]),
  validate(employeeValidation),
  async (req, res, next) => {
    try {
      await EmployeeService.create(
        req.body.firstName,
        req.body.fatherName,
        req.body.grandFatherName,
        req.body.email,
        req.body.phoneNumber,
        req.body.department,
        req.body.position,
        req.body.birthDay,
        req.body.country,
        req.body.homeAddress,
        req.body.hiredOn
      );
      res.status(200).json();
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @swagger
 * /employees/{id}:
 *   put:
 *     summary: Employee update
 *     description: An endpoint for updating an employee.
 *     tags:
 *       [Employees]
 *     parameters:
 *      - in: path
 *        name: id
 *        type: string
 *        required: false
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.put(
  "/:id",
  roleBasedAuth([RoleType.Admin]),
  validate(idValidation),
  validate(employeeValidation),
  async (req, res, next) => {
    try {
      await EmployeeService.update(
        req.params.id,
        req.body.firstName,
        req.body.fatherName,
        req.body.grandFatherName,
        req.body.email,
        req.body.phoneNumber,
        req.body.department,
        req.body.position,
        req.body.birthDay,
        req.body.country,
        req.body.homeAddress,
        req.body.hiredOn
      );
      res.status(200).json();
    } catch (err) {
      next(err);
    }
  }
);

/**
 * @swagger
 * /employees/{id}:
 *   delete:
 *     summary: Delete employee
 *     description: An endpoint for deleting an employee.
 *     tags:
 *       [Employees]
 *     parameters:
 *      - in: path
 *        name: id
 *        type: string
 *        required: false
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.delete(
  "/:id",
  roleBasedAuth([RoleType.Admin]),
  validate(idValidation),
  async (req, res, next) => {
    try {
      await EmployeeRepository.deleteOne(req.params.id);
      res.status(200).json();
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
