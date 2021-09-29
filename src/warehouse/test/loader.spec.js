const { describe, expect, test } = require('@jest/globals');
const { resolve } = require('path');

const { products, articles } = require('../loader');
const Product = require('../models/product');
const Article = require('../models/article');
const ArticleProduct = require('../models/article-product');

const isArray = (value) => Array.isArray(value);

describe('loaders', () => {
  test('products', () => {
    const res = products(resolve(__dirname, './products.mock.json'));

    expect(isArray(res)).toBeTruthy();
    expect(res.length).toBe(2);

    res.forEach((product) => {
      expect(product instanceof Product).toBeTruthy();
      expect(isArray(product.articles)).toBeTruthy();
      product.articles.forEach((article) => expect(article instanceof ArticleProduct).toBeTruthy());
    });
  });

  test('articles', () => {
    const res = articles(resolve(__dirname, './inventory.mock.json'));

    expect(isArray(res)).toBeTruthy();
    res.forEach((article) => expect(article instanceof Article).toBeTruthy());
  });
});
