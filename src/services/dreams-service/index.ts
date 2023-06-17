import { notFoundError } from '@/errors';
import { badRequestError } from '@/errors/bad-request-error';
import { createDream } from '@/protocols';
import dreamRepository from '@/repositories/dreams-repository';

async function createDream(userId: number, dream: createDream) {
    if (!dream) throw badRequestError();

    const { title, dateToBeDone, totalScore, pictureUrl } = dream

    return dreamRepository.create({ userId, title, dateToBeDone, totalScore, pictureUrl });
}


const dreamService = {
    createDream
};

export default dreamService;
