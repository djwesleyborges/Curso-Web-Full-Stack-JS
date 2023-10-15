import request from 'supertest'
import app from '../src/app'
import exp from 'constants';

describe('Testando rotas de accounts', () => {

    it('GET /accounts/ - Deve retornar statusCode 200', async ()=>{
        const resultado = await request(app)
        .get('/accounts/');

        expect(resultado.status).toEqual(200);
        expect(Array.isArray(resultado.body)).toBeTruthy();
    })

    it('POST /accounts/ - Deve retornar statusCode 201', async () => {
        const payload = {
            id: 1,
            name: 'Wesley',
            email: 'wesley@gmail.com',
            password: '123456789',
            status: 100
        }

        const resultado = await request(app)
            .post('/accounts/')
            .send(payload)
        
        expect(resultado.statusCode).toEqual(201)
        expect(resultado.body.id).toBe(1)
    })

    it('POST /accounts/ - Deve retornar statusCode 422', async () => {
        const payload = {
            id: 1,
            street: 'Rua H21',
            city: '12345',
            state: 'GO'
        }

        const resultado = await request(app)
            .post('/accounts/')
            .send(payload)
        
        expect(resultado.statusCode).toEqual(422)
    })

    it('GET /accounts/:id - Deve retornar statusCode 200', async ()=>{
        const resultado = await request(app)
        .get('/accounts/1');

        expect(resultado.status).toEqual(200);
        expect(resultado.body.id).toBe(1);
    })

    it('GET /accounts/:id - Deve retornar statusCode 404', async ()=>{
        const resultado = await request(app)
        .get('/accounts/2');

        expect(resultado.status).toEqual(404);
    })

    it('GET /accounts/:id - Deve retornar statusCode 400', async ()=>{
        const resultado = await request(app)
        .get('/accounts/abc');

        expect(resultado.status).toEqual(400);
    })
});