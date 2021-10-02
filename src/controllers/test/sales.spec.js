const { describe, expect, test } = require('@jest/globals');
const res = require('./mocked.res');
const { getSales, createSale } = require('../sales')(require('./mocked.wh')(require('./products.json')));

describe('sales controllers', () => {
  test('get sales list ', () => {
    const { code, msg } = getSales({}, res);
    expect(code).toBe(200);
    expect(msg).toStrictEqual([]);
  });

  test('create sale without product name', () => {
    const { code, msg } = createSale({}, res);
    expect(code).toBe(400);
    expect(msg).toHaveProperty('message', 'no product name found');
  });

  test('create sale', () => {
    const { code, msg } = createSale({ params: { name: 'a' } }, res);
    expect(code).toBe(201);
    expect(msg).toBeUndefined();
  });

  test('try to create sale for a product without stock', () => {
    const { code, msg } = createSale({ params: { name: 'b' } }, res);
    expect(code).toBe(409);
    expect(msg).toHaveProperty('message', 'Product not available');
  });

  test('try to create sale for a unknown product', () => {
    const { code, msg } = createSale({ params: { name: 'pepe' } }, res);
    expect(code).toBe(404);
    expect(msg).toHaveProperty('message', 'Product not found');
  });
});
