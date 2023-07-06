'use strict';
const logger = require('../middleware/logger.js');

// testing for - did it log something
// did it call the next function

describe('tests the logger middleware', () => {
  // arrange a couple things before testing
  let consoleSpy;
  let req = { method: 'GET', path: '/test' };
  let res = {};
  let next = jest.fn(); // spy on the next value () => {}

  //   Mock functions are also known as "spies", because they let you spy on the behavior of a function that is called indirectly by some other code, rather than just testing the output. You can create a mock function with jest.fn().

  // Check the documentation for jest.fn() https://jestjs.io/docs/jest-object

  beforeEach(() => {
    // console.log("pizza!");
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    // Put the console back - cleanup
    consoleSpy.mockRestore();
  });

  test('properly logs some output', () => {
    req.method = 'GET'; // Set the request method to 'GET'
    logger(req, res, next);
    expect(consoleSpy).toHaveBeenCalledWith(
      `Hello: ever expanding universe ${req.method} ${req.path}`
    );
  });
});
