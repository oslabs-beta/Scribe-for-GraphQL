import express from 'express';
import { generateTypeTest } from '../controllers/typeTestController';
const router = express.Router();

router.route('/').post(generateTypeTest);

// router.post('/', generateTypeTest, (_, res) => {
//   return res.status(200).json(res.locals.typeTests);
// });

//need middleware here for when users save tests produced from a schema saved under a schema name
router.get('/:schemaName', (_, res) => {
  return res.status(200);
});

export default router;
