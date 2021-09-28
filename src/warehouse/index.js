const log = require('../logger')('warehouse-manager');

let instance;

class WareHouse {
  constructor(store) {
    if (instance) {
      return instance;
    }

    this.store = store;
    this.products = [];
    this.articles = {};
    this._sales = {};

    instance = this;
  }

  get loader() {
    return {
      products: (filename, { reset = false }) => {
        try {
          const items = require('./loader').products(filename);
          this.addProducts(items, { reset });
        } catch (error) {
          log.error(error);
        }
      },
      articles: (filename, { reset = false }) => {
        try {
          const items = require('./loader').articles(filename);
          this.addArticles(items, { reset });
        } catch (error) {
          log.error(error);
        }
      },
    };
  }

  /**
   * add product list to warehouse
   *
   * @param {array <Product>} productList
   * @param {object} [options={}]
   * @memberof WareHouse
   */
  addProducts(list = [], options = {}) {
    const { reset = false } = options;

    if (reset) {
      log.debug('cleaning product list...');
      this.products = [];
    }

    list.forEach((item) => {
      this.products.push(item);
    });

    log.debug(`${list.length} product(s) added`);
  }

  /**
   *
   *
   * @param {array <Article>} articleList
   * @param {object} [options={}]
   * @memberof WareHouse
   */
  addArticles(list = [], options = {}) {
    const { reset = false } = options;

    if (reset) {
      log.debug('cleaning article list...');
      this.articles = {};
    }

    list.forEach((item) => {
      const prev = this.articles[item.id];
      this.articles[item.id] = item;

      if (prev) {
        log.debug(`updating stock for article ${item.id}...`);
        this.articles[item.id].stock += prev.stock;
      } else {
        log.debug(`adding new stock for article ${item.id}...`);
      }
    });

    log.debug(`${list.length} article(s) added`);
  }

  /**
   * returns product list with quantity depending on current inventory
   *
   * @readonly
   * @memberof WareHouse
   */
  get availableProducts() {
    return this.products.map((product) => {
      const { name, price } = product;
      const stock = product.availability(this.articles);
      return { name, price, stock };
    });
  }

  /**
   * sell a product and update article stock
   *
   * @param {*} name
   * @memberof WareHouse
   */
  sellProductName(name) {
    const product = this.products.find((item) => item.name.toLowerCase() === name.toLowerCase());

    if (!product) {
      throw new Error(`product not found: ${name}`);
    }

    if (!product.availability(this.articles)) {
      throw new Error(`product not available ${name}`);
    }

    product.articles.forEach(({ id, amount }) => {
      this.articles[id].stock -= amount;
      log.debug(`new stock for article ${id} #${this.articles[id].stock}`);
    });

    if (!this._sales[name]) {
      this._sales[name] = 0;
    }

    this._sales[name]++;
    log.debug(`one unit of ${name} was sold`);
  }

  /**
   * list of sold products
   *
   * @readonly
   * @memberof WareHouse
   */
  get sales() {
    const keys = Object.keys(this._sales);
    return keys.map((name) => ({ name, amount: this._sales[name] }));
  }
}

module.exports = WareHouse;