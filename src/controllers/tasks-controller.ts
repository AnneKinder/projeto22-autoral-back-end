import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import tasksService from '@/services/tasks-service';
import dreamService from '@/services/dreams-service';


export async function addTasks(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
        const task = req.body.task
      const dreamId = Number(req.body.dreamId)
  
      const newTask = await tasksService.createTask(task, dreamId);
      const newTaskId = newTask.id
  
      return res.status(httpStatus.OK).send({
        task, dreamId
      });
    } catch (error) {
      next(error);
    }
  }


export async function updateTaskStatus(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const { taskId } = req.params;
    const {dreamId, newScore} = req.body

   const updatedTask = await tasksService.updateStatus(Number(taskId));

   const updatedPartialPoints =  await dreamService.updatePartialPoints(Number(dreamId), Number(newScore))

    return res.status(httpStatus.OK).send({
      updatedTask,
     updatedPartialPoints
  });
  } catch (error) {
    next(error);
  }
}

