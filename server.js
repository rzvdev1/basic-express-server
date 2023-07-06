'use strict';
const express = require('express');
const server = express();
const pageNotFoundHandler = require('./src/errorHandling/404.js');
const errorHandler = require('./src/errorHandling/500.js');
const logger = require('./src/middleware/logger.js');
const validator = require('./src/middleware/validator.js');

function start(port) {
  server.listen(port, () => console.log(`I am listening on port ${port}`));
}
server.use(logger);
server.use(validator);
server.use(express.json());

server.get('/', (req, res) => res.send('Hello World'));

server.get('/hello', (req, res) => {
  if (!req.query.name) {
    throw new Error('Hey! You were supposed to give us your name!');
  }
  res.send(`Hello, ${req.query.name}`);
});

server.get('/hello/:person', (req, res) => {
  res.send(`Hello, ${req.params.person}`);
});

server.post('/hello', (req, res) => {
  res.send(`Hello, ${req.body.name}`);
});

server.get('/goodbye', (req, res) => res.send('Goodbye World!'));
server.get('/bad', (req, res, next) =>
  next({ message: 'This is a bad route!' })
);

server.use('*', pageNotFoundHandler);
server.use(errorHandler);

module.exports = { server, start };
