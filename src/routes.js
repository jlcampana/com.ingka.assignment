module.exports = (server, securityManager, warehouseManager) => {
  const mwToken = require('./mw/token')(securityManager); //token validation middleware
  const mwWriteAccess = require('./mw/write'); //write access check middleware
  const mwLog = require('./mw/log');

  const loginController = require('./controllers/oauth')(securityManager);
  const uploadDataController = require('./controllers/admin')(warehouseManager);
  const productsController = require('./controllers/products')(warehouseManager);
  const { getSales: salesController, createSale: createSaleController } = require('./controllers/sales')(warehouseManager);

  server.post('/api/oauth2', mwLog, loginController);
  server.get('/api/products', [mwLog, mwToken], productsController);
  server.get('/api/sales', [mwLog, mwToken], salesController);
  server.post('/api/sales/:name', [mwLog, mwToken, mwWriteAccess], createSaleController);
  server.post('/api/admin/products', [mwLog, mwToken, mwWriteAccess], uploadDataController);
  server.post('/api/admin/articles', [mwLog, mwToken, mwWriteAccess], uploadDataController);

  //Managing unknown endpoints
  server.get('*', mwToken, require('./controllers/404'));
  server.post('*', mwToken, require('./controllers/404'));
  server.put('*', mwToken, require('./controllers/404'));
  server.delete('*', mwToken, require('./controllers/404'));
};
