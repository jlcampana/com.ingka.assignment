const { describe, expect, test } = require('@jest/globals');
const res = require('./mocked.res');
const tokenController = require('../oauth')(require('./mocked.security'));

describe('oauth controller', () => {
  test('no credentials', () => {
    const { code, msg } = tokenController({}, res);
    expect(code).toBe(401);
    expect(msg).toHaveProperty('message', 'Invalid credentials');
  });

  test('invalid password', () => {
    const { code, msg } = tokenController(
      {
        body: { user: 'u1', password: 'invalid_password' },
      },
      res
    );
    expect(code).toBe(401);
    expect(msg).toHaveProperty('message', 'Invalid credentials');
  });

  test('invalid user', () => {
    const { code, msg } = tokenController(
      {
        body: { user: 'fake_user', password: 'fake_password' },
      },
      res
    );
    expect(code).toBe(401);
    expect(msg).toHaveProperty('message', 'Invalid credentials');
  });

  test('valid credentials', () => {
    const { code, msg } = tokenController(
      {
        body: { user: 'u1', password: 'p1' },
      },
      res
    );
    expect(code).toBe(200);
    expect(msg).toHaveProperty('token_type', 'Bearer');
    expect(msg).toHaveProperty('access_token', 'THIS_IS_A_TOKEN');
  });
});
