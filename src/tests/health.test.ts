import request from 'supertest';
import app from '../app'; // Importing the app we exported earlier

describe('Health Check Endpoint', () => {
  it('should return status 200 and json "ok"', async () => {
    // Act: Send a GET request to /health
    const res = await request(app).get('/health');

    // Assert: Check the results
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('status', 'ok');
    expect(res.body).toHaveProperty('env');
    // Ensure timestamp exists
    expect(res.body.timestamp).toBeDefined();
  });
});
