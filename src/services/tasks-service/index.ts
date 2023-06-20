import { notFoundError } from '@/errors';
import { badRequestError } from '@/errors/bad-request-error';
import { createTasklist, tasklistWithoutDreamId } from '@/protocols';
import tasksRepository from '@/repositories/tasks-repository';

async function getTasklist(dreamId: number) {
    const tasklist = await tasksRepository.findTasklist(dreamId);
    if (!tasklist) throw notFoundError();

    return tasklist;
}

// async function getTaskStatus(tasklistId: number) {
//     const taskStatus = await tasksRepository.findTaskStatus(tasklistId);
//     if (!taskStatus) throw notFoundError();

//     await tasksRepository.findTaskStatus(tasklistId)

//     return taskStatus;
// }


async function createTasklist(dreamId: number, tasks: tasklistWithoutDreamId) {
    if (!dreamId) throw notFoundError();
    if (!tasks) throw badRequestError()

    const { t1, t2, t3, t4, t5 } = tasks
  
    const tasklist = await tasksRepository.create({ dreamId, t1, t2, t3, t4, t5 });

    return tasklist
    
}

async function createTaskStatus(tasklistId: number) {
    if (!tasklistId) throw notFoundError();

    const taskStatus = await tasksRepository.createStatus(tasklistId);
  
    return taskStatus
    
}


// async function updateStatus(taskStatusId: number, taskNumber:string) {
//     if (!taskStatusId) throw notFoundError();
//     if (!taskNumber) throw badRequestError()
//     const isDone = true
   
//     const newStatus = await tasksRepository.update( taskStatusId, taskNumber, isDone);
  
//     return newStatus
    
// }






const tasksService = {
    getTasklist,
    // getTaskStatus,
    createTasklist,
    createTaskStatus,
    // updateStatus
};

export default tasksService;
