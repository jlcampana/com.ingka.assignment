const { resolve } = require('path');
const Article = require('./models/article');
const Product = require('./models/product');
const ArticleProduct = require('./models/article-product');
const isArray = (value) => Array.isArray(value);
const isString = (value) => typeof value === 'string' || value instanceof String;

/**
 * import product json
 * @param {string|object} filename
 * @returns {array} of Product
 */
const products = (filenameOrJSON) => {
  const json = isString(filenameOrJSON) ? require(resolve(filenameOrJSON)) : filenameOrJSON;
  const { products: list = [] } = json || {};

  return list.map((item) => {
    const { name, contain_articles: articles = [], price = 0 } = item;
    const articleList = articles.map(({ art_id, amount_of }) => new ArticleProduct(art_id, amount_of));

    return new Product(name, price, articleList);
  });
};

/**
 * import inventory json
 * @param {string|object} filenameOrJSON
 * @returns {array} of Article
 */
const articles = (filenameOrJSON) => {
  const json = isString(filenameOrJSON) ? require(resolve(filenameOrJSON)) || {} : filenameOrJSON;
  const { inventory: list = [] } = json || {};

  return list.map(({ art_id: id, name, stock = 0 }) => new Article(id, name, stock));
};

module.exports = { products, articles };
