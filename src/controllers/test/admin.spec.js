const { describe, expect, test } = require('@jest/globals');
const res = require('./mocked.res');
const uploadController = require('../admin')(require('./mocked.wh')(require('./products.json')));
const file = { mimetype: 'application/json', data: '{}' };
let req;

describe('admin controllers', () => {
  beforeEach(() => {
    req = { files: {} };
  });
  test('upload product list ', () => {
    req.files.products = file;

    const { code, msg } = uploadController(req, res);
    expect(code).toBe(200);
    expect(msg).toHaveProperty('message', '0 items added');
  });

  test('upload article list ', () => {
    req.files.articles = file;

    const { code, msg } = uploadController(req, res);
    expect(code).toBe(200);
    expect(msg).toHaveProperty('message', '0 items added');
  });
});
