const log = require('./logger')();
const { port, secret } = require('./config');
const WareHouse = require('./warehouse');
const SecurityManager = require('./security');

const manager = new WareHouse();
const reset = true;
manager.loader.products('./data/products.json', { reset });
manager.loader.articles('./data/inventory.json', { reset });

const security = new SecurityManager(secret);
security.loader('./data/users.json');

log.debug(manager.availableProducts);
manager.sellProductName('Dinning Table');
log.debug(manager.availableProducts);
manager.sellProductName('Dining Chair');
log.debug(manager.availableProducts);
log.debug(manager.sales);

// manager.sellProductName('Dining Chair');

try {
  const [user] = security.users;
  const token = security.createToken(user, '1ms');
  const user2 = security.verifyToken(token);
  log.info(user2);
} catch (error) {
  log.error(error);
}
