import { notFoundError } from '@/errors';
import { badRequestError } from '@/errors/bad-request-error';
import { createDream } from '@/protocols';
import dreamRepository from '@/repositories/dreams-repository';

async function getDreamList(userId: number) {
    const dreamlist = await dreamRepository.findDreams(userId);
    if (!dreamlist) throw notFoundError();

    return dreamlist;
}


async function getDreamByDreamId(dreamId: number) {
    const dream = await dreamRepository.findByDreamId(dreamId)

    if (!dream) {
        throw notFoundError();
    }
    return dream;
}


async function createDream(userId: number, dream: createDream) {
    if (!dream) throw badRequestError();

    const { title, dateToBeDone, totalScore, pictureUrl } = dream

    return dreamRepository.create({ userId, title, dateToBeDone, totalScore, pictureUrl });
}


const dreamService = {
    getDreamList,
    getDreamByDreamId,
    createDream
};

export default dreamService;
