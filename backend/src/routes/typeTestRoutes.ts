import express from 'express';
import { generateTypeTest } from '../controllers/typeTestController';
import { generateResolverTests } from '../controllers/resolverTestController';
const router = express.Router();

router.route('/').post(generateTypeTest);

// router.post('/', generateTypeTest, (_, res) => {
//   return res.status(200).json(res.locals.typeTests);
// });

router.route('/resolvers').post(generateResolverTests);

//need middleware here for when users save tests produced from a schema saved under a schema name
router.get('/:schemaName', (_, res) => {
  return res.status(200);
});

export default router;
