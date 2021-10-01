const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

const WareHouse = require('./warehouse');
const SecurityManager = require('./security');

const log = require('./logger')();
const { port, secret, serverAddress, contentSecurityPolicy } = require('./config');

const warehouseManager = new WareHouse();
const securityManager = new SecurityManager(secret);

try {
  const reset = true;
  warehouseManager.loader.products('./data/products.json', { reset });
  warehouseManager.loader.articles('./data/inventory.json', { reset });
  securityManager.loader('./data/users.json');

  const server = express();
  server.set('x-powered-by', false);
  server.use(compression());

  const createParentPath = true;
  const extended = false;

  server.use(helmet({ contentSecurityPolicy }));
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended }));
  server.use(bodyParser.json());
  server.use(fileUpload({ createParentPath }));

  require('./routes')(server, securityManager, warehouseManager);

  server.listen(port, serverAddress, () => {
    log.info(`server started ➜ http://${serverAddress}:${port}`);
    log.info('ready and listening for request...');
  });
} catch (error) {
  log.error(`server not started due error`, error);
  process.exit(1);
}
