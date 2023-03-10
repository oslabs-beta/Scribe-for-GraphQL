import express from 'express';
import { register, login } from '../controllers/authController';
const router = express.Router();

router.route('/login').get(login).post(login);
router.route('/register').post(register);

export default router;
