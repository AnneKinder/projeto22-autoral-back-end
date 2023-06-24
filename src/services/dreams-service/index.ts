import { notFoundError } from '@/errors';
import { badRequestError } from '@/errors/bad-request-error';
import { createDream } from '@/protocols';
import dreamRepository from '@/repositories/dreams-repository';
import tasksRepository from '@/repositories/tasks-repository';

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

    return await dreamRepository.create({ userId, title, dateToBeDone, totalScore, pictureUrl });
}

async function updatePartialPoints(dreamId: number, newScore: number) {
    if (!dreamId) throw badRequestError()
    if (!newScore) throw badRequestError()

    return await dreamRepository.updatePartialPoints(dreamId, newScore)

}

async function doneTasks(dreamId: number) {
  return await tasksRepository.findFinishedTasks(dreamId)
}

async function updateCompletedDream(dreamId: number) {
    if (!dreamId) throw badRequestError()

    return await dreamRepository.updateDreamCompletion(dreamId)

}





const dreamService = {
    getDreamList,
    getDreamByDreamId,
    createDream,
    updatePartialPoints,
    doneTasks,
    updateCompletedDream
};

export default dreamService;
