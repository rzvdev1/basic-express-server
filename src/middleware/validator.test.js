const validator = require('./validator');

describe('validator middleware', () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = {
      query: {},
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    next = jest.fn();
  });

  it('should pass the request through when the name property is valid', () => {
    req.query.name = 'John';

    validator(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  it('should send a 400 error response when the name property is missing', () => {
    validator(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Name property is missing or empty',
    });
  });

  it('should send a 400 error response when the name property is empty', () => {
    req.query.name = '';

    validator(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Name property is missing or empty',
    });
  });
});
