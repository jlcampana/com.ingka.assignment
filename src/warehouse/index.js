const log = require('../logger')('warehouse-manager');
const ProductError = require('./error');
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
      products: (filename, options = {}) => {
        const { reset = false } = options;
        try {
          const items = require('./loader').products(filename);
          return this.addProducts(items, { reset });
        } catch (error) {
          log.error(error);
          throw new ProductError();
        }
      },
      articles: (filename, options = {}) => {
        const { reset = false } = options;
        try {
          const items = require('./loader').articles(filename);
          return this.addArticles(items, { reset });
        } catch (error) {
          log.error(error);
          throw new ProductError();
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
   * @returns {Number} number of products added
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

    return list.length;
  }

  /**
   *
   *
   * @param {array <Article>} articleList
   * @param {object} [options={}]
   * @memberof WareHouse
   * @returns {Number} number of articles added
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

    return list.length;
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
      throw new ProductError(ProductError.codes.PRODUCT_NOT_FOUND);
      // throw new Error(`product not found: ${name}`);
    }

    if (!product.availability(this.articles)) {
      throw new ProductError(ProductError.codes.PRODUCT_NOT_AVAILABLE);
      // throw new Error(`product not available: ${name}`);
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

  /**
   * reset system
   *
   * @memberof WareHouse
   */
  reset() {
    this.products = [];
    this.articles = {};
    this._sales = {};
  }
}

module.exports = WareHouse;
