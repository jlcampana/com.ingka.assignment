const log = require('../logger')();

module.exports = (req, _res, next) => {
  const { originalUrl } = req;
  log.debug(`=> ${originalUrl}`);

  return next();
};
