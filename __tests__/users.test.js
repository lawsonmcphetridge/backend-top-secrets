const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');

const fakeAccount = {
    firstname: 'Lawson',
    lastname: 'McPhetridge',
    email: 'lawsonmcphetridge@gmail.com',
    password: 'supercoolpassword'
};

const registerAndLogin = async (userProps = {}) => {
    const password = userProps.password ?? fakeAccount.password;
    const agent = request.agent(app);
    const user = await UserService.create({ ...fakeAccount, ...userProps });
    const { email } = user;
    await await agent.post('/api/v1/users/sessions').send({ email, password });
    return [agent, user];
}

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

    it('test to see if a user is logged in', async () => {
        const [agent, user] = await registerAndLogin();
        const me = await agent.get('/api/v1/users/sessions');
        expect(me.body).toEqual({
            ...user
        })
  })

})



