const errors = {
  PRODUCT_NOT_FOUND: {
    code: 'NOT_FOUND',
    message: 'Product not found',
    status: 404,
  },
  PRODUCT_NOT_AVAILABLE: {
    code: 'NOT_AVAILABLE',
    message: 'Product not available',
    status: 409,
  },
  UNKNOWN_ERROR: {
    code: 'UNKNOWN',
    message: 'Internal error',
    status: 500,
  },
};

class ProductError extends Error {
  constructor(code) {
    const { code: errorCode, message, status } = errors[code] || errors['UNKNOWN_ERROR'];
    super(message);
    this.code = errorCode;
    this.status = status;
  }

  static get codes() {
    return Object.keys(errors).reduce((acc, key) => {
      acc[key] = key;
      return acc;
    }, {});
  }
}

module.exports = ProductError;
