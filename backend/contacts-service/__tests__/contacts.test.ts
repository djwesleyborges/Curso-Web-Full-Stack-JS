import {jest, describe, expect, it, beforeAll, afterAll} from '@jest/globals'
import request from 'supertest'
import app from '../src/app'
import accountsApp from '../../account-service/src/app'
import { IContact } from '../src/models/contact';
import repository from '../src/models/contactRepository';

const testEmail = 'jest@accounts.test.com';
const testEmail2 = 'jest2@accounts.test.com'
const testPassword = '123456'
let jwt : string = '';
let testAccountId : number = 0;
let testContactId : number = 0;

beforeAll(async () => {
    const testAccount = {
        name: 'Jest',
        email: testEmail,
        password: testPassword,
        domain: 'jest.com'
    }
    const account = await request(accountsApp)
    .post('/accounts/')
    .send(testAccount);
    testAccountId = account.body.id!;

    const result = await request(accountsApp)
    .post('/accounts/login')
    .send({
        email: testEmail,
        password: testPassword
    });
    jwt = result.body.token;
})

afterAll(async () => {

    await request(accountsApp)
    .post('/accounts/logout')

    await request(accountsApp)
    .delete('/accounts/' + testAccountId);
})

describe('Testando rotas de contacts', () => {

    it('GET /contacts/ - Deve retornar statusCode 200', async ()=>{
        const resultado = await request(app)
        .get('/contacts/')
        .set('x-access-token', jwt);

        expect(resultado.status).toEqual(200);
        expect(Array.isArray(resultado.body)).toBeTruthy();
    })

});
