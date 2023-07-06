'use strict';
const express = require('express');
const server = express();

function start(port) {
  server.listen(port, () => console.log(`I am listening on port ${port}`));
}

server.get('/', (req, res) => res.send('Hello World'));

module.exports = { server, start };
