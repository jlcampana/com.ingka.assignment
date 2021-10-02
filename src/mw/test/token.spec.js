const { describe, expect, test } = require('@jest/globals');
const res = require('./mocked.res');
const next = require('./mocked.next');
const security = require('./mocked.security');
const mw = require('../token')(security);
let req;

describe('authentication middleware', () => {
  beforeEach(() => {
    req = {
      headers: {},
    };
  });

  test('request without headers', () => {
    const { code, msg } = mw({}, res, next);
    expect(code).toBe(403);
    expect(msg).toHaveProperty('message', 'Security token not found');
  });

  test('request without authorization header', () => {
    const { code, msg } = mw({ headers: {} }, res, next);
    expect(code).toBe(403);
    expect(msg).toHaveProperty('message', 'Security token not found');
  });

  test('request with no bearer token', () => {
    req.headers.authorization = 'NO BEARER';
    const { code, msg } = mw(req, res, next);
    expect(code).toBe(403);
    expect(msg).toHaveProperty('message', 'Security token not found');
  });

  test('request with invalid token', () => {
    req.headers.authorization = 'Bearer INVALID';
    const { code, msg } = mw(req, res, next);
    expect(code).toBe(401);
    expect(msg).toHaveProperty('message', 'The security token is invalid or has expired');
  });

  test('request with expired token', () => {
    req.headers.authorization = 'Bearer EXPIRED';
    const { code, msg } = mw(req, res, next);
    expect(code).toBe(401);
    expect(msg).toHaveProperty('message', 'The security token is invalid or has expired');
  });

  test('request with valid token', () => {
    req.headers.authorization = 'Bearer VALID';
    const result = mw(req, res, next);
    expect(result).toBe('next executed');
    expect(req).toHaveProperty('warehouse');
    expect(req.warehouse).toHaveProperty('user', 'token ok');
  });
});
