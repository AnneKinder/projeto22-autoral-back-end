import { prisma } from '@/config';
import { CreateTask } from '@/protocols';
import { Tasks, } from '@prisma/client';

type CreateParams = Omit<Tasks, 'id' | 'createdAt' | 'updatedAt'>;


async function create(data: CreateTask): Promise<Tasks> {
return prisma.tasks.create({
  data
})
}

// async function findTasklist(dreamId: number): Promise<TaskList> {
//   return prisma.taskList.findFirst({
//     where: {
//       dreamId,
//     }
//   });
// }


// async function update( taskStatusId:number, data: Object): Promise<StatusOfTasks> {
//   return prisma.statusOfTasks.update({
//     where: {
//       id: taskStatusId
//     },
//     data
//   })

// }

const tasksRepository = {
  create,
  // findTasklist,
  // update
};


export default tasksRepository;