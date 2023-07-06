'use strict';

const supertest = require('supertest');
const { server } = require('../server.js');
const mockRequest = supertest(server);

describe('server routes and functionality', () => {
  test('the / route will send a response of Hello World', async () => {
    const response = await mockRequest.get('/');
    expect(response.status).toBe(200); // Expect a successful response
    expect(response.text).toBe('Hello World');
  });

  describe('Testing our server', () => {
    test('request to goodbye route sends string goodbye', async () => {
      const response = await mockRequest.get('/goodbye');
      expect(response.text).toBe('Goodbye World!');
    });

    test('request to hello route sends string hello', async () => {
      const response = await mockRequest.get(`/hello?name=${name}`);
      expect(response.status).toBe(200); // Expect a successful response
      expect(response.text).toBe(`Hello, ${name}`);
    });

    test('handles undefined routes', async () => {
      const response = await mockRequest.get('/bad');
      expect(response.status).toBe(500); // Expect an error response
      expect(response.body.message).toBe('This is a bad route!');
    });
  });
});
