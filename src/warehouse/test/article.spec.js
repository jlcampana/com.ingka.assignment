const { describe, expect, test } = require('@jest/globals');
const Article = require('../models/article');

const isString = (value) => typeof value === 'string' || value instanceof String;
const isNumber = (value) => typeof value === 'number' && isFinite(value);

describe('model: Article', () => {
  test('mandatory fields (id, name)', () => {
    try {
      const a = new Article();
      expect(a).toBeUndefined();
    } catch (error) {
      expect(error).toBeDefined();
      expect(error).toHaveProperty('code', 'ERR_ASSERTION');
    }

    try {
      const a = new Article(1);
      expect(a).toBeUndefined();
    } catch (error) {
      expect(error).toBeDefined();
      expect(error).toHaveProperty('code', 'ERR_ASSERTION');
    }
  });
  test('correct values', () => {
    let a = new Article(1, 'pepe');
    expect(a).toHaveProperty('id', '1');
    expect(a).toHaveProperty('name', 'pepe');
    expect(a).toHaveProperty('stock', 0);
    expect(isString(a.id)).toBeTruthy();
    expect(isString(a.name)).toBeTruthy();
    expect(isNumber(a.stock)).toBeTruthy();

    a = new Article('#a1', 'Article number 1', '5');
    expect(a).toHaveProperty('id', '#a1');
    expect(a).toHaveProperty('name', 'Article number 1');
    expect(a).toHaveProperty('stock', 5);
    expect(isNumber(a.stock)).toBeTruthy();

    a = new Article('#a1', 'Article number 1', '5.1');
    expect(a).toHaveProperty('id', '#a1');
    expect(a).toHaveProperty('name', 'Article number 1');
    expect(a).toHaveProperty('stock', 5);
    expect(isNumber(a.stock)).toBeTruthy();

    a = new Article('#a1', 'Article number 1', '5.5');
    expect(a).toHaveProperty('id', '#a1');
    expect(a).toHaveProperty('name', 'Article number 1');
    expect(a).toHaveProperty('stock', 5);
    expect(isNumber(a.stock)).toBeTruthy();

    a = new Article('#a1', 'Article number 1', '5.9');
    expect(a).toHaveProperty('id', '#a1');
    expect(a).toHaveProperty('name', 'Article number 1');
    expect(a).toHaveProperty('stock', 5);
    expect(isNumber(a.stock)).toBeTruthy();
  });

  test('negative stock', () => {
    try {
      const a = new Article('#a1', 'Article number 1', -1);
      expect(a).toBeUndefined();
    } catch (error) {
      expect(error).toBeDefined();
      expect(error).toHaveProperty('code', 'ERR_ASSERTION');
    }
  });
});
