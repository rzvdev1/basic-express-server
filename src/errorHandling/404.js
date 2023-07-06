'use strict';
const pageNotFoundHandler = (req, res) => {
  res.status(404).send({
    error: 404,
    route: req.path,
    message: 'No such route!',
  });
};

module.exports = pageNotFoundHandler;
