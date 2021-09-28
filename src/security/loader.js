const { resolve } = require('path');
const User = require('../security/user');

/**
 *import user json
 *
 * @param {string} filename
 * @return {array} of User
 */
module.exports = (filename) => {
  const users = require(resolve(filename)) || [];

  return users.map(({ name, id, pwd, role }) => new User(name, id, pwd, role));
};
