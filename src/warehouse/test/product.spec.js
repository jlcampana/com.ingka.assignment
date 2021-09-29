const { describe, expect, test } = require('@jest/globals');
const Product = require('../models/product');
const ArticleProduct = require('../models/article-product');

const isString = (value) => typeof value === 'string' || value instanceof String;
const isArray = (value) => Array.isArray(value);
const isNumber = (value) => typeof value === 'number' && isFinite(value);

describe('model: Product', () => {
  test('mandatory fields', () => {
    try {
      const p = new Product();
      expect(p).toBeUndefined();
    } catch (error) {
      expect(error).toBeDefined();
      expect(error).toHaveProperty('code', 'ERR_ASSERTION');
    }
  });
  test('correct object creation', () => {
    let p;

    p = new Product('p1');
    expect(p).toHaveProperty('name', 'p1');
    expect(p).toHaveProperty('price', 0);
    expect(p).toHaveProperty('articles', []);

    p = new Product('p2', '5');
    expect(p).toHaveProperty('name', 'p2');
    expect(p).toHaveProperty('price', 5);
    expect(p).toHaveProperty('articles', []);

    p = new Product('p3', 5);
    expect(p).toHaveProperty('name', 'p3');
    expect(p).toHaveProperty('price', 5);
    expect(p).toHaveProperty('articles', []);

    p = new Product('p4', -5);
    expect(p).toHaveProperty('name', 'p4');
    expect(p).toHaveProperty('price', 5);
    expect(p).toHaveProperty('articles', []);

    p = new Product('p5', 10.5);
    expect(p).toHaveProperty('name', 'p5');
    expect(p).toHaveProperty('price', 10.5);
    expect(p).toHaveProperty('articles', []);

    p = new Product('p6', '10.5');
    expect(p).toHaveProperty('name', 'p6');
    expect(p).toHaveProperty('price', 10.5);
    expect(p).toHaveProperty('articles', []);

    p = new Product(7, '10.5');
    expect(p).toHaveProperty('name', '7');
    expect(isString(p.name)).toBeTruthy();
    expect(p).toHaveProperty('price', 10.5);
    expect(p).toHaveProperty('articles', []);
  });

  test('product with articles fields', () => {
    const p = new Product('p8', 4, [new ArticleProduct(1, 2), new ArticleProduct(2, 4)]);
    expect(p).toHaveProperty('name', 'p8');
    expect(p).toHaveProperty('price', 4);
    expect(p).toHaveProperty('articles');
    expect(isArray(p.articles)).toBeTruthy();
    expect(p.articles.length).toBe(2);

    const [_1stArticle, _2ndArticle] = p.articles;
    expect(_1stArticle).toHaveProperty('id', '1');
    expect(_1stArticle).toHaveProperty('amount', 2);
    expect(_2ndArticle).toHaveProperty('id', '2');
    expect(_2ndArticle).toHaveProperty('amount', 4);
  });

  test('product availability', () => {
    const articleList = {
      1: { id: '1', name: 'leg', stock: 12 },
      2: { id: '2', name: 'screw', stock: 17 },
      3: { id: '3', name: 'seat', stock: 2 },
      4: { id: '4', name: 'table top', stock: 1 },
    };

    let p;

    p = new Product(1, 10, [new ArticleProduct(1, 12)]);
    expect(p.availability(articleList)).toBeTruthy();

    p = new Product(1, 10, [new ArticleProduct(1, 13)]);
    expect(p.availability(articleList)).toBeFalsy();

    p = new Product(1, 10, [new ArticleProduct(1, 9), new ArticleProduct(2, 10)]);
    expect(p.availability(articleList)).toBeTruthy();

    p = new Product(1, 10, [new ArticleProduct(1, 9), new ArticleProduct(3, 3)]);
    expect(p.availability(articleList)).toBeFalsy();
  });
});
