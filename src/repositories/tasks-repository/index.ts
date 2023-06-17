import { prisma } from '@/config';
import { TaskList } from '@prisma/client';

type CreateParams = Omit<TaskList, 'id' | 'createdAt' | 'updatedAt'>;

async function create( data: CreateParams): Promise<TaskList> {
    return prisma.taskList.create({
        data
      });
}

const tasksRepository = {
    create,
  };
   
  
  export default tasksRepository;