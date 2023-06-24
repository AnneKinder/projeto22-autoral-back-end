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

async function update(taskId: number): Promise<Tasks> {
  return prisma.tasks.update({
    where: {
      id: taskId
    },
    data: {
      isDone: true,
    },
  })
}

async function findFinishedTasks(dreamId: number): Promise<Tasks[]> {
  return await prisma.tasks.findMany({
    where: {
      AND: [
        { dreamId},
        { isDone: true }
      ],
    },
  })
}


const tasksRepository = {
  create,
  findTasks,
  update,
  findFinishedTasks
};

export default tasksRepository;