const log = require('../logger')('security-manager');
const User = require('./user');

let instance;

class SecurityManager {
  constructor() {
    if (instance) {
      return instance;
    }

    this.users = [];

    instance = this;
  }

  loader(filename) {
    try {
      this.users = require('./loader')(filename) || [];
      log.debug(`${this.users.length} user(s) added`);
    } catch (error) {
      log.error(error);
    }
  }

  checkCredentials(usr, pwd) {
    return undefined;
  }

  createToken(user) {}

  verifyToken(token) {}
}

module.exports = SecurityManager;
