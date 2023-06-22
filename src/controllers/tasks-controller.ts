import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import tasksService from '@/services/tasks-service';


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

    const updated = await tasksService.updateStatus(Number(taskId));

    return res.status(httpStatus.OK).send({
      updated
    });
  } catch (error) {
    next(error);
  }
}

