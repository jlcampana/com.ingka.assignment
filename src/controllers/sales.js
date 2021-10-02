const log = require('../logger')('sale-controller');

module.exports = (warehouse) => {
  const getSales = (_req, res) => {
    try {
      const sales = warehouse.sales;

      return res.status(200).send(sales);
    } catch (error) {
      log.error(error);

      return res.status(500).send({ message: 'Internal server error' });
    }
  };
  const createSale = (req, res) => {
    const { params = {} } = req;
    const { name } = params;

    if (!name) {
      return res.status(400).send({ message: 'no product name found' });
    }

    try {
      warehouse.sellProductName(name);

      return res.status(201).send();
    } catch (error) {
      const { status, message } = error;

      return res.status(status).send({ message });
    }
  };

  return { getSales, createSale };
};
