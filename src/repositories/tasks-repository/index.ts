import { prisma } from '@/config';
import { TaskList } from '@prisma/client';

type CreateParams = Omit<TaskList, 'id' | 'createdAt' | 'updatedAt'>;

async function create(data: CreateParams): Promise<TaskList> {
  return prisma.taskList.create({
    data
  });
}
async function findTasklist(dreamId: number): Promise<TaskList> {
  return prisma.taskList.findFirst({
    where: {
      dreamId,
    }
  });
}

const tasksRepository = {
  create,
  findTasklist
};


export default tasksRepository;