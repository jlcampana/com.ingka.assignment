class ArticleProduct {
  constructor(id, amount = 0) {
    this.id = id;
    this.amount = Number(amount);
  }
}

module.exports = ArticleProduct;
