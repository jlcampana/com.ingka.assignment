/* istanbul ignore file */
const assert = require('assert');
class Article {
  constructor(id, name, stock = 0) {
    assert(id, 'mandatory field "id"');
    assert(name, 'mandatory field "name"');
    assert(Number(stock) >= 0, 'stock could not be a negative number');

    this.id = String(id);
    this.name = String(name);

    this.stock = Math.trunc(Number(stock));
  }
}

module.exports = Article;
