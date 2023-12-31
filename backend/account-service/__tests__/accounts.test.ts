import request from 'supertest'
import app from '../src/app'
import { IAccount } from '../src/models/account';
import repository from '../src/models/accountRepository';
import auth from '../src/auth';

const testEmail = 'jest@accounts.test.com';
const testEmail2 = 'jest2@accounts.test.com'
const hashPassword = '$2a$10$ye/d5KSzdLt0TIOpevAtde2mgreLPUpLpnE0vyQJ0iMBVeZyklKSi';
let jwt: string = '';
let testId: number = 0;

beforeAll(async () => {
    const testAccount: IAccount = {
        name: 'Jest',
        email: testEmail,
        password: hashPassword,
        domain: 'jest.com'
    }
    const result = await repository.addAccount(testAccount);
    testId = result.id!;
    jwt = await auth.sign(result.id!);
})

afterAll(async () => {
    await repository.removeByEmail(testEmail);
    await repository.removeByEmail(testEmail2);
})

describe('Testando rotas de accounts', () => {

    it('GET /accounts/ - Deve retornar statusCode 200', async () => {
        const resultado = await request(app)
            .get('/accounts/')
            .set('x-access-token', jwt);

        expect(resultado.status).toEqual(200);
        expect(Array.isArray(resultado.body)).toBeTruthy();
    })

    it('POST /accounts/ - Deve retornar statusCode 201', async () => {
        const payload: IAccount = {
            name: 'Jest2',
            email: testEmail2,
            password: '123456',
            domain: 'jest.com'
        }

        const resultado = await request(app)
            .post('/accounts/')
            .send(payload)

        expect(resultado.statusCode).toEqual(201);
        expect(resultado.body.id).toBeTruthy();
    })

    it('POST /accounts/ - Deve retornar statusCode 422', async () => {
        const payload = {
            street: 'rua 1',
            city: 'Goiânia',
            state: 'GO'
        }

        const resultado = await request(app)
            .post('/accounts/')
            .send(payload)

        expect(resultado.statusCode).toEqual(422)
    })

    it('PATCH /accounts/:id - Deve retornar statusCode 200', async () => {
        const payload = {
            name: 'Wesley Dev',
        }

        const resultado = await request(app)
            .patch('/accounts/' + testId)
            .send(payload)
            .set('x-access-token', jwt)

        expect(resultado.statusCode).toEqual(200);
        expect(resultado.body.id).toEqual(testId);
        expect(resultado.body.name).toEqual(payload.name);
    })

    it('PATCH /accounts/:id - Deve retornar statusCode 400', async () => {
        const payload = {
            name: 'Wesley Dev',
        }

        const resultado = await request(app)
            .patch('/accounts/abc')
            .send(payload)
            .set('x-access-token', jwt)

        expect(resultado.statusCode).toEqual(400)
    })

    it('PATCH /accounts/:id - Deve retornar statusCode 404', async () => {
        const payload = {
            name: 'Wesley Borges'
        }

        const resultado = await request(app)
            .patch('/accounts/-1')
            .send(payload)
            .set('x-access-token', jwt)

        expect(resultado.statusCode).toEqual(404)
    })

    it('GET /accounts/:id - Deve retornar statusCode 200', async () => {
        const resultado = await request(app)
            .get('/accounts/' + testId)
            .set('x-access-token', jwt)

        expect(resultado.status).toEqual(200);
        expect(resultado.body.id).toBe(testId);
    })

    it('GET /accounts/:id - Deve retornar statusCode 404', async () => {
        const resultado = await request(app)
            .get('/accounts/-1')
            .set('x-access-token', jwt)

        expect(resultado.status).toEqual(404);
    })

    it('GET /accounts/:id - Deve retornar statusCode 400', async () => {
        const resultado = await request(app)
            .get('/accounts/abc')
            .set('x-access-token', jwt)

        expect(resultado.status).toEqual(400);
    })

});
