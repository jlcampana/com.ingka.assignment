const { describe, expect, test } = require('@jest/globals');
const res = require('./mocked.res');
const productsController = require('../products')(require('./mocked.wh')(require('./products.json')));

describe('products controllers', () => {
  test('get available products list ', () => {
    const { code, msg } = productsController({}, res);
    expect(code).toBe(200);
    expect(msg).toStrictEqual(['a']);
  });
});
