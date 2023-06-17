import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { addDreamAndTasklist, listDreams } from '@/controllers/dreams-controller';

const dreamRouter = Router();

dreamRouter
  .all('/*', authenticateToken)
  .post('', addDreamAndTasklist)
  .get('', listDreams)

export { dreamRouter };
