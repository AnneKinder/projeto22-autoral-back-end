import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import tasksService from '@/services/tasks-service';

export async function findTaskStatus(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const { tasklistId } = req.params;

    try {
        // const taskStatus = await tasksService.getTaskStatus(Number(tasklistId));
        // return res.status(httpStatus.OK).send(taskStatus);
    } catch (error) {
        next(error);
    }
}

export async function updateTaskStatus(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const { taskStatusId } = req.params;
    const {taskNumber} = req.body

    try {
        // const newStatus = await tasksService.updateStatus(Number(taskStatusId), taskNumber);
        // return res.status(httpStatus.OK).send(newStatus);
    } catch (error) {
        next(error);
    }
}

