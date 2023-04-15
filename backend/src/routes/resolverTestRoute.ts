import express from 'express';
import { generateResolverTests } from '../controllers/resolverTestController';
const router = express.Router();

router.route('/').post(generateResolverTests);

// router.post('/', generateTypeTest, (_, res) => {
//   return res.status(200).json(res.locals.typeTests);
// });

//need middleware here for when users save tests produced from a schema saved under a schema name
router.get('/:schemaName', (_, res) => {
  return res.status(200);
});

export default router;
