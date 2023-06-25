import faker from '@faker-js/faker';
import httpStatus from 'http-status';
import * as jwt from 'jsonwebtoken';
import supertest from 'supertest';
import {
    createUser,
    createDream,

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

describe('GET /dreams/dreamlist', () => {
    it('should respond with status 401 if no token is given', async () => {
        const response = await server.get('/dreams/dreamlist');

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond with status 401 if given token is not valid', async () => {
        const token = faker.lorem.word();

        const response = await server.get('/dreams/dreamlist').set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond with status 401 if there is no session for given token', async () => {
        const userWithoutSession = await createUser();
        const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

        const response = await server.get('/dreams/dreamlist').set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    describe('when token is valid', () => {

        it('should respond with status 404 when given dream doesnt exist', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const dream = await createDream(user.id)

            const response = await server.get('/dreams/dreamlist?dreamId=1/').set('Authorization', `Bearer ${token}`);

            expect(response.status).toEqual(httpStatus.NOT_FOUND);
        });

        it('should respond with status 200 and with dream', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const dream = await createDream(user.id);

            const response = await server.get(`/dreams/dreamlist?dreamId=1`).set('Authorization', `Bearer ${token}`);

            expect(response.status).toEqual(httpStatus.OK);
            expect(response.body).toEqual({
                id: expect.any(Number),
                userId: dream.userId,
                title: dream.title,
                dateToBeDone: dream.dateToBeDone,
                totalScore: dream.totalScore,
                pictureUrl: dream.pictureUrl,
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
            });
        });

        it('should respond with status 200 and with dreamlist', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const dream = await createDream(user.id);

            const response = await server.get(`/dreams/dreamlist`).set('Authorization', `Bearer ${token}`);

            expect(response.status).toEqual(httpStatus.OK);
            expect(response.body).toEqual([{
                id: expect.any(Number),
                userId: dream.userId,
                title: dream.title,
                dateToBeDone: dream.dateToBeDone,
                totalScore: dream.totalScore,
                pictureUrl: dream.pictureUrl,
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
            }]);
        });
    });
});

describe('POST /dreams', () => {
    it('should respond with status 401 if no token is given', async () => {
        const response = await server.post('/dreams');

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond with status 401 if given token is not valid', async () => {
        const token = faker.lorem.word();

        const response = await server.post('/dreams').set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond with status 401 if there is no session for given token', async () => {
        const userWithoutSession = await createUser();
        const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

        const response = await server.post('/dreams').set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    describe('when token is valid', () => {
        it('should respond with status 400 if body param title is missing', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);

            const body = {
                dateToBeDone: faker.lorem.sentence(),
                totalScore: faker.datatype.number({ min: 10, max: 100 }),
                pictureUrl: faker.internet.url()
            };

            const response = await server.post('/dreams').set('Authorization', `Bearer ${token}`).send(body);

            expect(response.status).toEqual(httpStatus.BAD_REQUEST);
        });

        it('should respond with status 400 if body param dateToBeDone is missing', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);

            const body = {
                title: faker.lorem.sentence(),
                totalScore: faker.datatype.number({ min: 10, max: 100 }),
                pictureUrl: faker.internet.url()
            };

            const response = await server.post('/dreams').set('Authorization', `Bearer ${token}`).send(body);

            expect(response.status).toEqual(httpStatus.BAD_REQUEST);
        });


        it('should respond with status 400 if body param totalScore is missing', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);

            const body = {
                title: faker.lorem.sentence(),
                dateToBeDone: faker.lorem.sentence(),
                pictureUrl: faker.internet.url()
            };

            const response = await server.post('/dreams').set('Authorization', `Bearer ${token}`).send(body);

            expect(response.status).toEqual(httpStatus.BAD_REQUEST);
        });


        it('should respond with status 400 if body param pictureUrl is missing', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);

            const body = {
                title: faker.lorem.sentence(),
                dateToBeDone: faker.lorem.sentence(),
                totalScore: faker.datatype.number({ min: 10, max: 100 }),
            };

            const response = await server.post('/dreams').set('Authorization', `Bearer ${token}`).send(body);

            expect(response.status).toEqual(httpStatus.BAD_REQUEST);
        });


        it('should respond with status 200 and with dream data', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);

            const userId = user.id
            const body = {
                userId,
                title: faker.lorem.sentence(),
                dateToBeDone: faker.lorem.sentence(),
                totalScore: faker.datatype.number({ min: 10, max: 100 }),
                pictureUrl: faker.internet.url()
            };

            const response = await server.post('/dreams').set('Authorization', `Bearer ${token}`).send(body);

            expect(response.status).toEqual(httpStatus.OK);
            expect(response.body).toEqual({
                id: expect.any(Number),
                userId: body.userId,
                title: body.title,
                dateToBeDone: body.dateToBeDone,
                totalScore: body.totalScore,
                pictureUrl: body.pictureUrl,
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
            });
        });

        it('should insert a new dream in the database', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);

            const beforeCount = await prisma.dreams.count();

            const body = {
                userId: user.id,
                title: faker.lorem.sentence(),
                dateToBeDone: faker.lorem.sentence(),
                totalScore: faker.datatype.number({ min: 10, max: 100 }),
                pictureUrl: faker.internet.url()
            };
            await server.post('/dreams').set('Authorization', `Bearer ${token}`).send(body);

            const afterCount = await prisma.dreams.count();

            expect(beforeCount).toEqual(0);
            expect(afterCount).toEqual(1);
        });
    });
});
