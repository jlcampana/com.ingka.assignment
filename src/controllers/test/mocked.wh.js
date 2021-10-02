/* istanbul ignore file */
const ProductError = require('../../warehouse/error');

module.exports = (data) => ({
  sales: [],
  sellProductName: (name) => {
    if (data[name] === undefined) {
      throw new ProductError(ProductError.codes.PRODUCT_NOT_FOUND);
    }

    if (data[name] === 0) {
      throw new ProductError(ProductError.codes.PRODUCT_NOT_AVAILABLE);
    }

    return undefined;
  },
});
