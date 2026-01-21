import request from 'supertest';
import app from '../app';

// 1. MOCK RABBITMQ
// This tells Jest: "Do not import the real mqService. Use these fake functions instead."
jest.mock('../services/mqService', () => ({
  connectToRabbitMQ: jest.fn(), // Returns undefined (success) immediately
  publishUserCreated: jest.fn(), // Returns undefined immediately
}));

describe('User API', () => {
  it('GET /users should return the default list of users', async () => {
    const res = await request(app).get('/users');
    
    expect(res.status).toBe(200);
    // 2. UPDATE EXPECTATION
    // We hardcoded 2 users in userService.ts, so we expect 2 here.
    expect(res.body).toHaveLength(2);
    expect(res.body[0].email).toBe('john@example.com');
  });

  it('POST /users should create a new user', async () => {
    const newUser = {
      name: 'Test User',
      email: 'test@example.com',
    };

    const res = await request(app).post('/users').send(newUser);

    expect(res.status).toBe(201);
    expect(res.body.name).toBe('Test User');
    expect(res.body.email).toBe('test@example.com');
  });
});
