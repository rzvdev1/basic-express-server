'use strict';

function logger(req, res, next) {
  console.log(`Hello: ever expanding universe ${req.method} ${req.path}`);
  next();
}
module.exports = logger;
