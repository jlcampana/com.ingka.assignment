const { describe, expect, test } = require('@jest/globals');
const { resolve } = require('path');
const loader = require('../loader');
const User = require('../user');

const isArray = (value) => Array.isArray(value);
describe('user loader', () => {
  test('load users', () => {
    const filename = resolve(__dirname, './users.mock.json');
    const res = loader(filename);

    expect(isArray(res)).toBeTruthy();
    res.forEach((u) => expect(u instanceof User).toBeTruthy());
  });
});
