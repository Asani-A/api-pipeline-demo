import request from 'supertest';
import app from '../app';

describe('User API', () => {
  it('GET /users should return an empty list initially', async () => {
    const res = await request(app).get('/users');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it('POST /users should create a new user', async () => {
    const newUser = { name: 'John Doe', email: 'john@example.com' };
    
    const res = await request(app).post('/users').send(newUser);
    
    expect(res.status).toBe(201);
    expect(res.body.name).toBe('John Doe');
    expect(res.body.id).toBeDefined();
  });
});
