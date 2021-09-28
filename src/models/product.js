class Product {
  constructor(id, name, price = 0, articles = []) {
    this.id = id;
    this.name = name;
    this.price = Number(price);
    this.articles = articles;
  }
}

module.exports = Product;
