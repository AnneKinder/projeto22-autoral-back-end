import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { addDreamAndTasklistAndStatus, findDreamByDreamId, listDreams } from '@/controllers/dreams-controller';
import { findTaskStatus, updateTaskStatus } from '@/controllers';

const dreamRouter = Router();

dreamRouter
  .all('/*', authenticateToken)
  .post('', addDreamAndTasklistAndStatus)
  .get('/dreamlist', listDreams)
  .get('/dreamlist/:dreamId', findDreamByDreamId)
  .get('/status/:tasklistId', findTaskStatus)
  .post('/status/:taskStatusId', updateTaskStatus);


export { dreamRouter };
