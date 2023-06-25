import { Dreams } from '@prisma/client';
import faker from '@faker-js/faker';
import { prisma } from '@/config';

async function createDream( userId: number): Promise<Dreams> {
    return prisma.dreams.create({
        data:{
            userId,
            title:faker.lorem.sentence(),
            dateToBeDone: faker.lorem.sentence(),
            totalScore: faker.datatype.number({ min: 10, max: 100 }),
            pictureUrl: faker.internet.url()
        }
      });
}
