import { prisma } from '@/config';
import { Dreams } from '@prisma/client';

type CreateParams = Omit<Dreams, 'id' | 'isDone' | 'dateWhenDone' | 'partialPoints' | 'createdAt' | 'updatedAt'>;

async function create( data: CreateParams): Promise<Dreams> {
    return prisma.dreams.create({
        data,
      });
}

const dreamRepository = {
  create,
};

export default dreamRepository;
