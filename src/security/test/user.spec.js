const { describe, expect, test } = require('@jest/globals');
const User = require('../user');

describe('model: User', () => {
  test('read only user', () => {
    const u = new User('name', 'id', 'pwd', User.roles.READ);
    expect(u).toHaveProperty('id', 'id');
    expect(u).toHaveProperty('name', 'name');
    expect(u).toHaveProperty('pwd', 'pwd');
    expect(u).toHaveProperty('_role', User.roles.READ);
    expect(u).toHaveProperty('rw', false);
  });
  test('read/write user', () => {
    const u = new User('name', 'id', 'pwd', User.roles.READ_WRITE);
    expect(u).toHaveProperty('id', 'id');
    expect(u).toHaveProperty('name', 'name');
    expect(u).toHaveProperty('pwd', 'pwd');
    expect(u).toHaveProperty('_role', User.roles.READ_WRITE);
    expect(u).toHaveProperty('rw', true);
  });

  test('set role', () => {
    const u = new User('name', 'id', 'pwd', User.roles.READ_WRITE);
    expect(u).toHaveProperty('_role', User.roles.READ_WRITE);
    expect(u).toHaveProperty('rw', true);

    u.role = User.roles.READ;
    expect(u).toHaveProperty('_role', User.roles.READ);
    expect(u).toHaveProperty('rw', false);

    u.role = User.roles.READ_WRITE;
    expect(u).toHaveProperty('_role', User.roles.READ_WRITE);
    expect(u).toHaveProperty('rw', true);
  });

  test('set role to unknown role', () => {
    const u = new User('name', 'id', 'pwd', User.roles.READ_WRITE);
    expect(u).toHaveProperty('_role', User.roles.READ_WRITE);
    expect(u).toHaveProperty('rw', true);

    u.role = 'UNKNOWN';
    expect(u).toHaveProperty('_role', User.roles.READ);
    expect(u).toHaveProperty('rw', false);
  });
});
