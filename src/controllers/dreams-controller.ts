import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import dreamService from '@/services/dreams-service';
import authenticationService from '@/services/authentication-service';
import tasksService from '@/services/tasks-service';

export async function addDreamAndTasklist(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {

    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
    const {userId} = await authenticationService.findSessiondByToken(token)

    const dream = req.body.dream
    const tasks = req.body.tasks

    const newDream = await dreamService.createDream(userId, dream);
    const dreamId = newDream.id

    const newTaskList = await tasksService.createTasklist(dreamId, tasks)

    return res.status(httpStatus.OK).send({
      dreamId,
      newTaskListId: newTaskList.id
    });
  } catch (error) {
    next(error);
  }
}

