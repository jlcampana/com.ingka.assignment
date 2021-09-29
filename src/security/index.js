const jwt = require('jsonwebtoken');
const log = require('../logger')('security-manager');
const User = require('./user');

const DEFAULT_SECRET = 'fistro_pecador_te_da_cuen';
const DEFAULT_TOKEN_EXPIRATION = '1h';
let instance;

class SecurityManager {
  constructor(secret = DEFAULT_SECRET, expiration = DEFAULT_TOKEN_EXPIRATION) {
    if (instance) {
      return instance;
    }

    this.secret = secret;
    this.tokenExpiration = expiration;
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

  createToken(user, expiration) {
    const { id } = user;
    const w = user.rw;
    const payload = { id, w };
    const expiresIn = expiration || this.tokenExpiration;

    try {
      return jwt.sign(payload, this.secret, { expiresIn });
    } catch (error) {
      log.error(error);
      return undefined;
    }
  }

  verifyToken(token) {
    try {
      return jwt.verify(token, this.secret);
    } catch (error) {
      const { message } = error;

      if (message === 'jwt expired') {
        throw new Error('token expired');
      } else {
        throw new Error('token invalid');
      }
    }
  }
}

module.exports = SecurityManager;
