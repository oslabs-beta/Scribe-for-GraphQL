import express from 'express';
import {
  getAllUsers,
  getSavedTests,
  saveTest,
} from '../controllers/userController';
const router = express.Router();

router.route('/').get(getAllUsers);
router.route('/tests').get(getSavedTests).post(saveTest);

export default router;
