const { describe, expect, test } = require('@jest/globals');
const ArticleProduct = require('../models/article-product');

const isString = (value) => typeof value === 'string' || value instanceof String;
const isNumber = (value) => typeof value === 'number' && isFinite(value);

describe('model: ArticleProduct', () => {
  test('correct object creation', () => {
    let ap = new ArticleProduct(1, 2);
    expect(ap).toHaveProperty('id', '1');
    expect(isString(ap.id)).toBeTruthy();
    expect(ap).toHaveProperty('amount', 2);
    expect(isNumber(ap.amount)).toBeTruthy();
  });
});
