const { describe, expect, test } = require('@jest/globals');
const res = require('./mocked.res');
const next = require('./mocked.next');
const mw = require('../write');
let req;
describe('check write access middleware', () => {
  beforeEach(() => {
    req = { warehouse: { user: { w: false } } };
  });
  test('user with write access', () => {
    req.warehouse.user.w = true;
    const result = mw(req, res, next);
    expect(result).toBe('next executed');
  });

  test('user without write access', () => {
    const { code, msg } = mw(req, res, next);
    expect(code).toBe(403);
    expect(msg).toHaveProperty('message', 'you do not have write access');
  });
});
