'use strict';

const errorHandler = (error, req, res, next) => {
  res.status(500).send({
    error: 500,
    route: req.path,
    query: req.query,
    body: req.body,
    message: `Server Error: ${error.message}`,
  });
};

module.exports = errorHandler;
