const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');




describe('secret tests', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('/secrets should have a list of secrets', async () => {
    const resp = await request(app).get('/secrets');
    expect(resp.body).toMatchInlineSnapshot();
  });
    

  
});
