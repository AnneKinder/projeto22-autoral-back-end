import { Tasks } from '@prisma/client';
import faker from '@faker-js/faker';
import { prisma } from '@/config';

export async function createTask( dreamId: number): Promise<Tasks> {
    return prisma.tasks.create({
        data:{
            dreamId,
            isDone: false,
            descrip:faker.lorem.sentence()
        }
      });
}
