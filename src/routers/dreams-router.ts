import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import {  addDream, findDreamInfoByDreamId, listDreams } from '@/controllers/dreams-controller';
import { addTasks } from '@/controllers';

const dreamRouter = Router();

dreamRouter
  .all('/*', authenticateToken)
  .post('', addDream)
  .post("/tasks", addTasks)
  .get('/dreamlist', listDreams)
  .get('/dreamlist/:dreamId', findDreamInfoByDreamId)
  // .post('/status/:taskStatusId', updateTaskStatus);


export { dreamRouter };
