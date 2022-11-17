const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const { CookieAccessInfo } = require('cookiejar');

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

  
  it('POST /api/v1/sessions signs in an existing user', async () => {
    await request(app).post('/api/v1/users').send(fakeAccount);
    const res = await request(app)
      .post('/api/v1/users/sessions')
      .send({ firstname: 'Lawson', lastname: 'McPhetridge', email: 'lawsonmcphetridge@gmail.com', password: 'supercoolpassword' });
    expect(res.status).toEqual(200);
      
      
  });
});



