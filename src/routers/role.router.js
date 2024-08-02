import express from 'express';
import { assignPermission } from '../controllers/role.controller.js';

const router = express.Router();


/**
 * @swagger
 * /api/roles/assign-permissions:
 *  get:
 *      summary: This is is used to check if get method is working or not
 *      description: This api is used to check if get method is working on not
 *      responses:
 *          201:
 *              description: To test Get method
 * 
 */
router.post('/assign-permissions', assignPermission);



export default router;