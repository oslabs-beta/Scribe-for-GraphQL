import express from 'express';
import { getAllUsers } from '../controllers/userController';
const router = express.Router();

router.route('/').get(getAllUsers);

export default router;
