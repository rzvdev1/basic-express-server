'use strict';

const supertest = require('supertest');
const { server } = require('../src/server');
const mockRequest = supertest(server);

describe('server routes and functionality', () => {
  test('the / route will send a response of Hello World', async () => {
    const response = await mockRequest.get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello World');
  });

  describe('Testing our server', () => {
    test('request to undefined route should return 404', async () => {
      const response = await mockRequest.get('/undefined-route');
      expect(response.status).toBe(404);
    });

    test('request with invalid method should return 404', async () => {
      const response = await mockRequest.put('/hello');
      expect(response.status).toBe(404);
    });

    test('request without name query should return 500', async () => {
      const response = await mockRequest.get('/hello');
      expect(response.status).toBe(500);
      expect(response.body).toEqual({
        error: 'Name property is missing or empty',
      });
    });

    test('request with name query should return 200', async () => {
      const response = await mockRequest.get('/hello?name=John');
      expect(response.status).toBe(200);
      expect(response.text).toBe('Hello, John');
    });

    test('request with name query should return correct output object', async () => {
      const name = 'John';
      const response = await mockRequest.get(`/hello/${name}`);
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: `Hello, ${name}` });
    });
  });
});
