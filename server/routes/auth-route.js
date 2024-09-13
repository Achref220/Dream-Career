const router = require("express").Router();

const { register, login, verifyEmail, verifyCaptcha } = require("../controllers/auth-controller");

/** Middlewares */
const { emailExists, userNameExists } = require("../middleware/middleware");



/**
 * @swagger
 * /login:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Login with username and password
 *     description: Login endpoint to authenticate users.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: User's username.
 *               password:
 *                 type: string
 *                 description: User's password.
 *     responses:
 *       '200':
 *         description: Successful login. Returns the authentication token.
 *       '401':
 *         description: Unauthorized. Invalid credentials.
 */

router.post("/login", login);

/**
 * @swagger
 * /register:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Register a new user
 *     description: Register endpoint to create a new user account.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: User's desired username.
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address.
 *               password:
 *                 type: string
 *                 format: password
 *                 description: User's password.
 *               location:
 *                 type: string
 *                 description: User's location.
 *               occupation:
 *                 type: string
 *                 description: User's occupation.
 *     responses:
 *       '200':
 *         description: Successful registration. Returns information about the newly registered user.
 *       '400':
 *         description: Bad request. User creation failed due to invalid data or existing username/email.
 */

router.post("/register", userNameExists, emailExists, register);

router.post("/verify-email", verifyEmail);
router.post("/verify-captcha", verifyCaptcha);

module.exports = router;
