import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import dreamService from '@/services/dreams-service';
import authenticationService from '@/services/authentication-service';
import tasksService from '@/services/tasks-service';
import { CreateTask } from '@/protocols';
import { Tasks } from '@prisma/client';

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

// export async function findDreamInfoByDreamId(req: AuthenticatedRequest, res: Response, next: NextFunction) {

//   const { dreamId } = req.params;

//   try {
//     const dream = await dreamService.getDreamByDreamId(Number(dreamId));

//     const tasklist = await tasksService.getTasklist(Number(dreamId));

//     const statusOfTask = await tasksService.getTaskStatus(Number(tasklist.id))

//     return res.status(httpStatus.OK).send({ dream, tasklist, statusOfTask });
//   } catch (error) {
//     next(error);
//   }
// }

export async function addDream(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const userId = Number(await getUserId(req))
    const dream = req.body.dream

    const newDream = await dreamService.createDream(userId, dream);
    const dreamId = newDream.id

    return res.status(httpStatus.OK).send({
      dreamId
    });
  } catch (error) {
    next(error);
  }
}

