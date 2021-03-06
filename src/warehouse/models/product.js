const assert = require('assert');
const MAX_STOCK = 99999999999999999999999999;
class Product {
  constructor(name, price = 0, articles = []) {
    assert(name, 'mandatory field "name"');
    this.name = String(name);
    this.price = Math.abs(Number(price));
    this.articles = articles;
  }

  /**
   * check availability of product depending on current article stock
   * the availability of a product depends on the availability of the article with less stock
   * @param {object} articleStock
   * @return {array}
   * @memberof Product
   */
  availability(articleStock) {
    const myPieces = this.articles.map((article) => {
      const { stock = 0 } = articleStock[article.id] || {};

      if (article.amount === 0) {
        return stock;
      } else {
        return Math.trunc(stock / article.amount);
      }
    });

    return myPieces.reduce((min, item) => (item < min ? item : min), MAX_STOCK);
  }
}

module.exports = Product;
