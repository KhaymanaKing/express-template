const request = require('supertest');
const { setupDb, signUpUser } = require ('./utils.js');
const app = require('../lib/app');
const { signedCookie } = require('cookie-parser');


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

  it('GET all items associated with user', async () => {
    const { agent } = await signUpUser();
    const { body: user1Item } = await agent.post('/api/v1/inventory').send({ 
      item: 'hammer', 
      qty: 20 });
 
    const { agent: agent2 } = await signUpUser({
      email: 'blorkhorkbjork@email.com',
      password: 'howdoispellpassword?'
    });

    const { body: user2Item } = await agent2.post('/api/v1/inventory').send({ 
      item: 'pork rinds ', 
      qty: 500 
    });

    const res1 =  await agent.get('/api/v1/inventory');
    expect(res1.status).toEqual(200);
    expect(res1.body).toEqual([user1Item]);
  
    const res2 = await agent2.get('/api/v1/inventory');
    expect(res2.status).toEqual(200);
    expect(res2.body).toEqual([user2Item]);
  });
  it('Get /:id should retrieve one item', async () => {
    const { agent } = await signUpUser();
    const { body: item } = await agent.post('/api/v1/inventory').send({
      item: 'pork rinds', 
      qty: 500
    });
    const { status, body: got } = await agent.get(`/api/v1/inventory/${item.id}`);
    expect(status).toBe(200);
    expect(got).toEqual(item);
  });
  it('GET / should return a 401 if not authenticated', async() => {
    const { status } = await request(app).get('/api/v1/inventory');
    expect(status).toEqual(401);
  });
});
