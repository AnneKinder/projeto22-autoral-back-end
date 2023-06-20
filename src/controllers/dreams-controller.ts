import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import dreamService from '@/services/dreams-service';
import authenticationService from '@/services/authentication-service';
import tasksService from '@/services/tasks-service';

export async function getUserId(request: AuthenticatedRequest) {
  try {
    const { authorization } = request.headers;
    const token = authorization?.replace("Bearer ", "");
    const { userId } = await authenticationService.findSessiondByToken(token)
    return userId

  } catch (error) {
    console.log(error);
  }
}

export async function listDreams(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {

    const userId = Number(await getUserId(req))

    const dreamlist = await dreamService.getDreamList(userId);

    return res.status(httpStatus.OK).send(dreamlist);
  } catch (error) {
    next(error);
  }
}

export async function findDreamByDreamId(req: AuthenticatedRequest, res: Response, next: NextFunction) {

  const { dreamId } = req.params;

  try {
    const dream = await dreamService.getDreamByDreamId(Number(dreamId));

    const tasklist = await tasksService.getTasklist(Number(dreamId));


    return res.status(httpStatus.OK).send({ dream, tasklist });
  } catch (error) {
    next(error);
  }
}

export async function addDreamAndTasklistAndStatus(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const userId = Number(await getUserId(req))
    const dream = req.body.dream
    const tasks = req.body.tasks

    const newDream = await dreamService.createDream(userId, dream);
    const dreamId = newDream.id

    const newTaskList = await tasksService.createTasklist(dreamId, tasks)
    const tasklistId = newTaskList.id

    const newTaskStatus = await tasksService.createTaskStatus(tasklistId)
    const taskStatusId = newTaskStatus.id

    return res.status(httpStatus.OK).send({
      dreamId,
      tasklistId,
      taskStatusId
    });
  } catch (error) {
    next(error);
  }
}

