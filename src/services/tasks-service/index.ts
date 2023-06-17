import { notFoundError } from '@/errors';
import { badRequestError } from '@/errors/bad-request-error';
import { createTasklist, tasklistWithoutDreamId } from '@/protocols';
import tasksRepository from '@/repositories/tasks-repository';

async function getTasklist(dreamId: number) {
    const tasklist = await tasksRepository.findTasklist(dreamId);
    if (!tasklist) throw notFoundError();

    return tasklist;
  }

async function createTasklist(dreamId: number, tasks:tasklistWithoutDreamId) {
    if (!dreamId) throw notFoundError();
    if (!tasks) throw badRequestError()

    const { t1, t2, t3, t4, t5 } = tasks

    return tasksRepository.create({ dreamId, t1, t2, t3, t4, t5 });
}


const tasksService = {
    getTasklist,
    createTasklist
};

export default tasksService;
