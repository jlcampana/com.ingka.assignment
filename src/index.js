const log = require('./logger')();
const WareHouse = require('./warehouse');
const SecurityManager = require('./security');

const manager = new WareHouse();
const reset = true;
manager.loader.products('./data/products.json', { reset });
manager.loader.articles('./data/inventory.json', { reset });

const security = new SecurityManager();
security.loader('./data/users.json');

log.debug(manager.availableProducts);
manager.sellProductName('Dinning Table');
log.debug(manager.availableProducts);
manager.sellProductName('Dining Chair');
log.debug(manager.availableProducts);
log.debug(manager.sales);

manager.sellProductName('Dining Chair');
