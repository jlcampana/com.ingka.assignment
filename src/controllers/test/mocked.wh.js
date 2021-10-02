/* istanbul ignore file */
const ProductError = require('../../warehouse/error');
const getAvailableProducts = (data) => Object.keys(data).filter((key) => data[key] > 0);

module.exports = (data) => ({
  sales: [],
  availableProducts: getAvailableProducts(data),
  sellProductName: (name) => {
    if (data[name] === undefined) {
      throw new ProductError(ProductError.codes.PRODUCT_NOT_FOUND);
    }

    if (data[name] === 0) {
      throw new ProductError(ProductError.codes.PRODUCT_NOT_AVAILABLE);
    }

    return undefined;
  },
  loader: {
    products: () => 0,
    articles: () => 0,
  },
});
