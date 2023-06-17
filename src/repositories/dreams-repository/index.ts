import { prisma } from '@/config';
import { Dreams } from '@prisma/client';

type CreateParams = Omit<Dreams, 'id' | 'isDone' | 'dateWhenDone' | 'partialPoints' | 'createdAt' | 'updatedAt'>;

async function create( data: CreateParams): Promise<Dreams> {
    return prisma.dreams.create({
        data,
      });
}


async function findDreams(userId: number): Promise<Dreams []> {
  return prisma.dreams.findMany({
    where: {
      userId,
    }
  });
}


const dreamRepository = {
  create,
  findDreams
};

export default dreamRepository;
