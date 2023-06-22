import { prisma } from '@/config';
import { CreateTask } from '@/protocols';
import { Tasks, } from '@prisma/client';

async function create(data: CreateTask): Promise<Tasks> {
return prisma.tasks.create({
  data
})
}

async function findTasks(dreamId: number): Promise<Tasks[]> {
  return prisma.tasks.findMany({
    where: {
      dreamId,
    }
  });
}


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
  findTasks,
  // update
};


export default tasksRepository;