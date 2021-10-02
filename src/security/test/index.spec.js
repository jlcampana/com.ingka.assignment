const { describe, expect, test } = require('@jest/globals');
const { resolve } = require('path');

const SecurityManager = require('..');

const sm = new SecurityManager('test_secret');

describe('security', () => {
  let userRW;
  let userR;

  beforeAll(() => {
    sm.loader(resolve(__dirname, './users.mock.json'));
    [userRW, userR] = sm.users;
  });
  test('valid token', () => {
    const token = sm.createToken(userRW, '1h');
    const user = sm.verifyToken(token);

    expect(user).toBeDefined();
  });

  test('expired token', () => {
    try {
      const token = sm.createToken(userRW, '1ms');
      const user = sm.verifyToken(token);
      expect(user).toBeUndefined();
    } catch (err) {
      expect(err).toHaveProperty('code', 'TOKEN_EXPIRED');
    }
  });
  test('invalid token', () => {
    try {
      const token = 'FAKE_TOKEN';
      const user = sm.verifyToken(token);
      expect(user).toBeUndefined();
    } catch (err) {
      expect(err).toHaveProperty('code', 'TOKEN_INVALID');
    }
  });

  test('empty user/password', () => {
    try {
      const u = sm.checkCredentials();
      expect(u).toBeUndefined();
    } catch (err) {
      expect(err).toHaveProperty('code', 'INVALID_CREDENTIALS');
    }

    try {
      const u = sm.checkCredentials('pepe');
      expect(u).toBeUndefined();
    } catch (err) {
      expect(err).toHaveProperty('code', 'INVALID_CREDENTIALS');
    }
  });

  test('invalid user', () => {
    try {
      const u = sm.checkCredentials('zzz', 'zzzzz');
      expect(u).toBeUndefined();
    } catch (err) {
      expect(err).toHaveProperty('code', 'INVALID_CREDENTIALS');
    }
  });

  test('invalid password', () => {
    try {
      const { id: user } = userRW;
      const u = sm.checkCredentials(user, 'zzzzz');
      expect(u).toBeUndefined();
    } catch (err) {
      expect(err).toHaveProperty('code', 'INVALID_CREDENTIALS');
    }
  });

  test('valid credentials', () => {
    try {
      const { id: user, pwd } = userRW;
      const u = sm.checkCredentials(user, pwd);
      expect(u).toHaveProperty('id', user);
    } catch (err) {
      expect(err).toBeUndefined();
    }
  });
});
