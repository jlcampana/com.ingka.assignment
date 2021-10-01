const log = require('../logger')('upload-controller');
const correctMimeType = (file) => (file && file.mimetype === 'application/json') || !file;
const mimetypeErrorMessage = (name, file) => `field:${name} file:${file.name} incorrect mimetype:${file.mimetype} expected:application/json`;

module.exports = (warehouse) => {
  return async (req, res) => {
    if (!req.files) {
      return res.status(400).send({ message: 'no file found' });
    }

    const { products, inventory } = req.files;

    if (!correctMimeType(products)) {
      return res.status(400).send({ message: mimetypeErrorMessage('products', products) });
    }

    if (!correctMimeType(inventory)) {
      return res.status(400).send({ message: mimetypeErrorMessage('inventory', inventory) });
    }

    let itemsAdded = 0;

    if (products) {
      try {
        const json = JSON.parse(products.data.toString());
        itemsAdded = warehouse.loader.products(json);
      } catch (error) {
        log.error(error);

        return res.status(500).send({ message: 'internal error while parsing products file' });
      }
    }

    if (inventory) {
      try {
        const json = JSON.parse(inventory.data.toString());
        itemsAdded = warehouse.loader.articles(json);
      } catch (error) {
        log.error(error);

        return res.status(500).send({ message: 'internal error while parsing inventory file' });
      }
    }

    return res.status(200).send({ message: `${itemsAdded} items added` });
  };
};
