import express from 'express';
import { register, login, logout } from '../controllers/authController';
const router = express.Router();

router.route('/login').get(login).post(login);
router.route('/register').post(register);
router.route('/logout').post(logout);

export default router;
