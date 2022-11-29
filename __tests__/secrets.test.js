const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('secret tests', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('/secrets should have a list of secrets', async () => {
    const resp = await request(app).get('/api/v1/secrets');
    expect(resp.body).toEqual([
      {
        created_at: expect.any(String),
        description: 'i love coding',
        id: '1',
        title: 'Super cool secret',
      },
      {
        created_at: expect.any(String),
        description: 'coding is cool',
        id: '2',
        title: 'top secret',
      },
    ]);
  });

  afterAll(() => {
    pool.end();
  });
});
