import express from 'express';
import { authenticateRoute } from '../controllers/authController';
import {
  getAllUsers,
  getSavedTests,
  saveTest,
  deleteTest,
} from '../controllers/userController';
const router = express.Router();

router.route('/').get(getAllUsers);
router.route('/tests/:id').delete(authenticateRoute, deleteTest);
router
  .route('/tests')
  .get(authenticateRoute, getSavedTests)
  .post(authenticateRoute, saveTest);

export default router;
