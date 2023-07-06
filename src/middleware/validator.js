'use strict';

function validator(req, res, next) {
  const name = req.query.name;

  if (!name || name.trim() === '') {
    return res.status(400).json({ error: 'Name property is missing or empty' });
  }

  // Valid name property, call the next middleware or route handler
  next();
}

module.exports = validator;
