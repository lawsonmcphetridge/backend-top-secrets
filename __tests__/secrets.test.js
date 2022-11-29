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
    expect(resp.body).toMatchInlineSnapshot(`
      Array [
        Object {
          "created_at": "2022-11-17T21:59:10.726Z",
          "description": "i love coding",
          "id": "1",
          "title": "Super cool secret",
        },
        Object {
          "created_at": "2022-11-17T21:59:10.726Z",
          "description": "coding is cool",
          "id": "2",
          "title": "top secret",
        },
      ]
    `);
  });

  afterAll(() => {
    pool.end();
  });
});
