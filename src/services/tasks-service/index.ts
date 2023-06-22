import { notFoundError } from '@/errors';
import { badRequestError } from '@/errors/bad-request-error';
import { tasktWithoutDreamId,
} from '@/protocols';
import tasksRepository from '@/repositories/tasks-repository';

async function getTasklist(dreamId: number) {
    const tasklist = await tasksRepository.findTasks(dreamId);
    if (!tasklist) throw notFoundError();

    return tasklist;
}


async function createTask(task: tasktWithoutDreamId, dreamId: number) {
    if (!task) throw badRequestError()

    const { descrip, isDone } = task

    return await tasksRepository.create({ dreamId, descrip, isDone });

}


// async function updateStatus(taskStatusId: number, taskNumber:string) {


// }



const tasksService = {
    getTasklist,
    createTask,
    // updateStatus
};

export default tasksService;
