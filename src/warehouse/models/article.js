class Article {
  constructor(id, name, stock) {
    this.id = id;
    this.name = name;
    this.stock = Number(stock);
  }
}

module.exports = Article;
