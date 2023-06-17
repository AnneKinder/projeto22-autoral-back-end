import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { addDreamAndTasklist } from '@/controllers/dreams-controller';

const dreamRouter = Router();

dreamRouter
  .all('/*', authenticateToken)
  .post('', addDreamAndTasklist)

export { dreamRouter };
