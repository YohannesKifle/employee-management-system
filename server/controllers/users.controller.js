const express = require("express");
const router = express.Router();
const {
  auth,
  refreshTokenValidation,
  paginationQueryParameter,
  paginationQueryValidation,
  roleBasedAuth,
  validateRefreshToken,
} = require("../middlewares/common.middleware");
const {
  profileValidation,
  profileUpdateValidation,
  loginValidation,
} = require("../middlewares/users.middleware");
const { validate } = require("express-validation");
const UserRepository = require("../data/user.repository");
const UserService = require("../services/user.service");
const RoleType = require("../types/role.types");

/**
 * @swagger
 * /users/profile:
 *   get:
 *     summary: User profile endpoint
 *     description: An endpoint for retrieving the user object of a logged in user.
 *     tags:
 *       [Users]
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.get("/profile", auth, async (req, res, next) => {
  try {
    let user = await UserRepository.get(req.user._id);
    user.hashedPassword = undefined;
    res.json(user);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /users:
 *   get:
 *     summary: List users
 *     description: An endpoint for retrieving users.
 *     tags:
 *       [Users]
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.get(
  "/",
  roleBasedAuth([RoleType.Admin, RoleType.Super_Admin]),
  async (req, res, next) => {
    try {
      let users = await UserRepository.getAllUnpaginated();
      res.json(users);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @swagger
 * /users/signup:
 *   post:
 *     summary: Signup endpoint
 *     description: An endpoint for Signing up a user.
 *     tags:
 *       [Users]
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
  "/signup",
  roleBasedAuth([RoleType.Super_Admin]),
  validate(profileValidation),
  async (req, res, next) => {
    try {
      let response = await UserService.register(
        req.body.firstName,
        req.body.fatherName,
        req.body.grandFatherName,
        req.body.phoneNumber,
        req.body.email,
        req.body.password,
        req.body.roles
      );
      res.json(response);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login endpoint
 *     description: Login endpoint that returns a JWT token.
 *     tags:
 *       [Users]
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
router.post("/login", validate(loginValidation), async (req, res, next) => {
  try {
    let response = await UserService.login(req.body.email, req.body.password);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /users/token/refresh:
 *   post:
 *     summary: Refresh token
 *     description: An endpoint that refreshes JWT token.
 *     tags:
 *       [Users]
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
  "/token/refresh",
  validate(refreshTokenValidation),
  validateRefreshToken,
  async (req, res, next) => {
    try {
      let response = await UserService.refreshToken(req.user._id);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @swagger
 * /users:
 *   put:
 *     summary: User profile update
 *     description: An endpoint for updating user email.
 *     tags:
 *       [Users]
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
  "/",
  auth,
  validate(profileUpdateValidation),
  async (req, res, next) => {
    try {
      await UserService.updateProfile(
        req.user._id,
        req.body.firstName,
        req.body.fatherName,
        req.body.grandFatherName,
        req.body.email,
        req.body.phoneNumber,
        req.body.currentPassword,
        req.body.newPassword
      );
      res.status(200).json();
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
