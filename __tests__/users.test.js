const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

const fakeAccount = {
    firstname: 'Lawson',
    lastname: 'McPhetridge',
    email: 'lawsonmcphetridge@gmail.com',
    password: 'supercoolpassword'
};

describe('secret tests', () => {
    beforeEach(() => {
        return setup(pool);
    });

    it('test to create a new user', async () => {
        const res = await request(app).post('/api/v1/users').send(fakeAccount);
        const { firstname, lastname, email } = fakeAccount;
        expect(res.body).toEqual({
            id: expect.any(String),
            firstname,
            lastname,
            email
        })

})




})



