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

async function findByDreamId(dreamId: number) {
  return prisma.dreams.findFirst({
    where: {
      id: dreamId,
    }
})}


async function updatePartialPoints(dreamId: number, newScore: number): Promise<Dreams> {
  return prisma.dreams.update({
    where: {
      id: dreamId
    },
    data: {
      partialPoints: newScore,
    },
  })
}

const dreamRepository = {
  create,
  findDreams,
  findByDreamId,
  updatePartialPoints
};

export default dreamRepository;
