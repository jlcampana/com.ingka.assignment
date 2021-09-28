const { resolve } = require('path');
const Article = require('./models/article');
const Product = require('./models/product');
const ArticleProduct = require('./models/article-product');

/**
 * import product json
 * @param {string} filename
 * @returns {array} of Product
 */
const products = (filename) => {
  const { products: list = [] } = require(resolve(filename)) || {};

  return list.map((item) => {
    const { name, contain_articles: articles = [], price = 0 } = item;
    const id = name.toLowerCase().replace(' ', '_');
    const articleList = articles.map(({ art_id, amount_of }) => new ArticleProduct(art_id, amount_of));

    return new Product(id, name, price, articleList);
  });
};

/**
 * import inventory json
 * @param {string} filename
 * @returns {array} of Article
 */
const articles = (filename) => {
  const { inventory: list = [] } = require(resolve(filename)) || {};

  return list.map(({ art_id: id, name, stock = 0 }) => new Article(id, name, stock));
};

module.exports = { products, articles };
