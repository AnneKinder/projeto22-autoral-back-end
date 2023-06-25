import faker from '@faker-js/faker';
import httpStatus from 'http-status';
import * as jwt from 'jsonwebtoken';
import supertest from 'supertest';
import {
    createUser,
    createDream,
    createTask
} from '../factories';
import { cleanDb, generateValidToken } from '../helpers';
import { prisma } from '@/config';
import app, { init } from '@/app';

beforeAll(async () => {
    await init();
});

beforeEach(async () => {
    await cleanDb();
});

const server = supertest(app);

describe('POST /dreams/tasks', () => {
    it('should respond with status 401 if no token is given', async () => {
        const response = await server.post('/dreams/tasks');

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond with status 401 if given token is not valid', async () => {
        const token = faker.lorem.word();

        const response = await server.post('/dreams/tasks').set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond with status 401 if there is no session for given token', async () => {
        const userWithoutSession = await createUser();
        const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

        const response = await server.post('/dreams/tasks').set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    describe('when token is valid', () => {
        it('should respond with status 400 if body param descrip is missing', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const dream = await createDream(user.id)

            const body = {
                dreamId: dream.id,
                isDone: dream.isDone,
            };

            const response = await server.post('/dreams/tasks').set('Authorization', `Bearer ${token}`).send(body);

            expect(response.status).toEqual(httpStatus.BAD_REQUEST);
        });


        it('should respond with status 200 and with task data', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const dream = await createDream(user.id)
            const task = await createTask(dream.id)

            const body = {
                dreamId: dream.id,
                isDone: false,
                descrip:faker.lorem.sentence()
            };

            const response = await server.post('/dreams/tasks').set('Authorization', `Bearer ${token}`).send(body);

            expect(response.status).toEqual(httpStatus.OK);
            expect(response.body).toEqual({
                id: expect.any(Number),
                dreamId: body.dreamId,
                isDone: body.isDone,
                descrip: body.descrip,
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
            });
        });

        it('should insert a new dream in the database', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const dream = await createDream(user.id)

            const beforeCount = await prisma.tasks.count();

            const body = {
                dreamId: dream.id,
                isDone: false,
                descrip:faker.lorem.sentence()
            };
            await server.post('/dreams/tasks').set('Authorization', `Bearer ${token}`).send(body);

            const afterCount = await prisma.dreams.count();

            expect(beforeCount).toEqual(0);
            expect(afterCount).toEqual(1);
        });
    });
});
