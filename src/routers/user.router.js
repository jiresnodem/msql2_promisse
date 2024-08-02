import express from 'express';
import { confirmRegistration, handleRefreshToken, login, register } from '../controllers/user.controller.js';

const router = express.Router();


/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - fullName
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         fullName:
 *           type: string
 *           description: The full name of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *       example:
 *         id: dfsdfdsdsfdsfsdfsdf
 *         fullName: nodem jires
 *         email: jires@example.com
 *         password: secret
 * tags:
 *   name: Users
 *   description: The users managing API
 * /api/auth/register:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 * /api/auth/login:
 *   post:
 *     summary: User login.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email: 
 *                 type: string
 *                 description: "User email"
 *                 example: "nodemjires19@gmail.com"
 *               password: 
 *                 type: string
 *                 description: "User password"
 *                 example: "Get@.123"
 *     responses:
 *       200:
 *         description: The user was successfully logged.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  meta: 
 *                    type: object
 *                    properties:
 *                      status:
 *                        type: string
 *                        example: 200
 *                    message:
 *                      type: string
 *                      example: "User logged successfully !!!"
 * 
 */

router.post('/register', register);
router.post('/confirm-registration', confirmRegistration);
router.post('/login', login);
router.get('/refresh', handleRefreshToken);
router.post('/assign-permission', );


export default router;

// *                 data:
// *                   type: object
// *                   properties:
// *                     user:
// *                       type: object
// *                       properties:
// *                        id:
// *                          type: string
// *                          example: "c089f8e9-91b4-47ef-b4c9-e140dcbeaa6b"
// *                        fullName:
// *                          type: string
// *                          example: "Tankeu"
// *                        email:
// *                          type: string
// *                           example: "nodemjires19@gmail.com"
// *                        password:
// *                          type: string
// *                          description: "Hashed user password"
// *                          example: "$2b$10$eb.fIoKvtrkdisTrVZ54NuQtPCdVnnKUjyI06e0r6M2SjK0acigta"
// *                        otp:
// *                          type: string
// *                          nullable: true
// *                          example: null
// *                        otp_expired_at:
// *                          type: string
// *                          format: date-time
// *                          nullable: true
// *                          example: null
// *                        is_verify:
// *                          type: integer
// *                          example: 0
// *                        created_at:
// *                          type: string
// *                          format: date-time
// *                          example: "2024-07-29T11:48:54.000Z"
// *                        updated_at:
// *                          type: string
// *                          format: date-time
// *                          example: "2024-07-29T11:48:54.000Z"
// *                    token:
// *                      type: object
// *                      properties:
// *                        type_token:
// *                          type: string
// *                          example: "Bearer"
// *                        access_token:
// *                          type: string
// *                          example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
// *                        refresh_token:
// *                          type: string
// *                          example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
// *       401: 
// *         description: "Invalid email or wrong password"
// *       500:
// *         description: Some server error