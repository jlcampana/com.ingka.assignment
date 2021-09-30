const { describe, expect, test } = require('@jest/globals');
const { resolve } = require('path');
const WareHouseManager = require('../index');
const wh = new WareHouseManager();

const isArray = (value) => Array.isArray(value);

describe('warehouse', () => {
  beforeEach(() => {
    wh.reset();
    wh.loader.products(resolve(__dirname, './products.mock.json'));
    wh.loader.articles(resolve(__dirname, './inventory.mock.json'));
  });

  test('available products', () => {
    const products = wh.availableProducts;

    expect(isArray(products)).toBeTruthy();
    expect(products.length).toBe(2);
    expect(products[0]).toHaveProperty('name', 'Dining Chair');
    expect(products[0]).toHaveProperty('stock', 2);

    expect(products[1]).toHaveProperty('name', 'Dinning Table');
    expect(products[1]).toHaveProperty('stock', 1);
  });

  test('sell a product', () => {
    try {
      expect(wh.sales.length).toBe(0);
      expect(wh.availableProducts[0]).toHaveProperty('stock', 2);

      wh.sellProductName(wh.availableProducts[0].name);
      expect(wh.availableProducts[0]).toHaveProperty('stock', 1);
      expect(wh.sales.length).toBe(1);
      expect(wh.sales[0]).toHaveProperty('name', wh.availableProducts[0].name);
      expect(wh.sales[0]).toHaveProperty('amount', 1);

      wh.sellProductName(wh.availableProducts[0].name);
      expect(wh.availableProducts[0]).toHaveProperty('stock', 0);
      expect(wh.sales.length).toBe(1);
      expect(wh.sales[0]).toHaveProperty('name', wh.availableProducts[0].name);
      expect(wh.sales[0]).toHaveProperty('amount', 2);
    } catch (error) {
      expect(error).toBeUndefined();
    }
  });

  test('sell an unknown product', () => {
    try {
      wh.sellProductName('fistro');
    } catch (error) {
      expect(error).toBeDefined();
      expect(error).toHaveProperty('code', 'NOT_FOUND');
    }
  });

  test('sell unavailable product', () => {
    try {
      expect(wh.availableProducts[1]).toHaveProperty('stock', 1);
      wh.sellProductName(wh.availableProducts[1].name);
      expect(wh.availableProducts[1]).toHaveProperty('stock', 0);

      wh.sellProductName(wh.availableProducts[1].name);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error).toHaveProperty('code', 'NOT_AVAILABLE');
    }
  });

  test('reset', () => {
    expect(wh.availableProducts.length).toBe(2);
    expect(wh.sales.length).toBe(0);
    wh.sellProductName(wh.availableProducts[1].name);
    expect(wh.sales.length).toBe(1);
    expect(Object.keys(wh.articles).length).toBe(4);

    wh.reset();
    expect(wh.availableProducts.length).toBe(0);
    expect(wh.sales.length).toBe(0);
    expect(Object.keys(wh.articles).length).toBe(0);
  });

  test.todo('add products');
  test.todo('add articles');
});
