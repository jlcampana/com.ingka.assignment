/* istanbul ignore file */
class ArticleProduct {
  constructor(id, amount = 0) {
    this.id = String(id);
    this.amount = Number(amount);
  }
}

module.exports = ArticleProduct;
