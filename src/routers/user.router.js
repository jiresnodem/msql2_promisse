import express from 'express';
import { confirmRegistration, handleRefreshToken, login, register } from '../controllers/user.controller.js';


const router = express.Router();

router.post('/register', register);
router.post('/confirm-registration', confirmRegistration);
router.post('/login', login);
router.get('/refresh', handleRefreshToken);


export default router;