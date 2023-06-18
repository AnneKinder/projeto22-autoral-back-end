import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { addDreamAndTasklist, findDreamByDreamId, listDreams } from '@/controllers/dreams-controller';

const dreamRouter = Router();

dreamRouter
  .all('/*', authenticateToken)
  .post('', addDreamAndTasklist)
  .get('/dreamlist', listDreams)
  .get('/dreamlist/:dreamId', findDreamByDreamId);

export { dreamRouter };
