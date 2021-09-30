module.exports = (server, securityManager, warehouseManager) => {
  const mwToken = require('./mw/token')(securityManager); //token validation middleware
  const mwWriteAccess = require('./mw/write'); //write access check middleware

  const loginController = require('./controllers/oauth')(securityManager);
  const { uploadArticles: uploadArticlesController, uploadProducts: uploadProductsController } = require('./controllers/admin')(warehouseManager);
  const productsController = require('./controllers/products')(warehouseManager);
  const { getSales: salesController, createSale: createSaleController } = require('./controllers/sales')(warehouseManager);

  server.post('/api/oauth2', loginController);
  server.get('/api/products', [mwToken], productsController);
  server.get('/api/sales', [mwToken], salesController);
  server.post('/api/sales/:name', [mwToken, mwWriteAccess], createSaleController);
  server.post('/api/admin/products', [mwToken, mwWriteAccess], uploadProductsController);
  server.post('/api/admin/articles', [mwToken, mwWriteAccess], uploadArticlesController);

  //Managing unknown endpoints
  server.get('*', require('./controllers/404'));
  server.post('*', require('./controllers/404'));
  server.put('*', require('./controllers/404'));
  server.delete('*', require('./controllers/404'));
};
