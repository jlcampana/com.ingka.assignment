const { describe, expect, test } = require('@jest/globals');
const res = require('./mocked.res');
const notFoundController = require('../404');

describe('404 controllers', () => {
  test('get 404 code ', () => {
    const { code, msg } = notFoundController({}, res);
    expect(code).toBe(404);
    expect(msg).toHaveProperty('message', 'not found');
  });
});
