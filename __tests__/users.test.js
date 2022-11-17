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



describe('secret tests', () => {
  beforeEach(() => {
    return setup(pool);
  });

  
  it('POST /api/v1/sessions signs in an existing user and a test for / to create an account', async () => {
    await request(app).post('/api/v1/users').send(fakeAccount);
    const res = await request(app)
      .post('/api/v1/users/sessions')
      .send({ firstname: 'Lawson', lastname: 'McPhetridge', email: 'lawsonmcphetridge@gmail.com', password: 'supercoolpassword' });
    expect(res.status).toEqual(200);
      
      
      
    it('delete /api/v1/sessions signs out a user', async () => {
      const agent = request.agent(app);
      const user = await UserService.create({ ...fakeAccount });
      await agent.post('/api/v1/users/sessions').send({
        firstname: 'Lawson',
        lastname: 'McPhetridge',
        email: 'lawsonmcphetridge@gmail.com',
        password: 'supercoolpassword'
      });
      const resp = await agent.delete('/api/v1/users/sessions');
      expect(resp.status).toBe(204);
      
    });
      
      
      
  });
});



