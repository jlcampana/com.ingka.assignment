const log = require('../logger')('products-controller');

module.exports = (warehouse) => {
  const availableProducts = (_req, res) => {
    try {
      const products = warehouse.availableProducts;

      return res.status(200).send(products);
    } catch (error) {
      log.error(error);

      return res.status(500).send({ message: 'Internal server error' });
    }
  };

  return availableProducts;
};
