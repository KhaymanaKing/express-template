const request = require('supertest');
const { setupDb, signUpUser } = require ('./utils.js');
const app = require('../lib/app');

describe('/api/v1/inventory', () => {
  beforeEach(setupDb);
  it('POST new item for current user', async () => {
    const { agent, user } = await signUpUser();
    const newItem = { item: 'hammer', qty: 20 };
    const { status, body } = await agent.post('/api/v1/inventory')
      .send(newItem);

    expect(status).toEqual(200);
    expect(body).toEqual({
      ...newItem,
      id: expect.any(String),
      user_id: user.id,
    });
  });
});
