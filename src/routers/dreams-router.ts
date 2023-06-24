import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import {  addDream, completeDream, findDreamInfoByDreamId, listDreams } from '@/controllers/dreams-controller';
import { addTasks, updateTaskStatus } from '@/controllers';

const dreamRouter = Router();

dreamRouter
  .all('/*', authenticateToken)
  .post('', addDream)
  .post('/complete', completeDream)
  .post("/tasks", addTasks)
  .get('/dreamlist', listDreams)
  .get('/dreamlist/:dreamId', findDreamInfoByDreamId)
  .post('/status/:taskId', updateTaskStatus);


export { dreamRouter };
