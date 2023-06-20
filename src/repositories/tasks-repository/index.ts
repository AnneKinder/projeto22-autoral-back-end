import { prisma } from '@/config';
import { StatusOfTasks, TaskList, } from '@prisma/client';

type CreateParams = Omit<TaskList, 'id' | 'createdAt' | 'updatedAt'>;
type UpdateStatusParams = Omit<StatusOfTasks, 'id' | 'createdAt' | 'updatedAt' >



async function create(data: CreateParams): Promise<TaskList> {
  return prisma.taskList.create({
    data
  });
}

async function createStatus(tasklistId: number): Promise<StatusOfTasks> {
  return prisma.statusOfTasks.create({
    data:{
      tasklistId
    }
  });
}

async function findTasklist(dreamId: number): Promise<TaskList> {
  return prisma.taskList.findFirst({
    where: {
      dreamId,
    }
  });
}

// async function findTaskStatus(tasklistId: number): Promise<TaskStatus[]> {
//   return prisma.taskStatus.findMany({
//     where: {
//       tasklistId,
//     }
//   });
// }

// async function update( taskStatusId:number, taskNumber: string, isDone: boolean): Promise<TaskStatus> {
//   return prisma.taskStatus.update({
//     where: {
//       id: taskStatusId
//     },
//     data: {
//       isDone,
//       taskNumber
//     }
//   })


// }

const tasksRepository = {
  create,
  createStatus,
  findTasklist,
  // findTaskStatus,
  // update
};


export default tasksRepository;