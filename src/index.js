const log = require('./logger')();
const importer = require('./import');

const products = importer.products('./data/products.json');
const articles = importer.articles('./data/inventory.json');
const users = importer.users('./data/users.json');

log.debug(products);
log.debug(articles);
log.debug(users);
