const jwt = require('jsonwebtoken');
const log = require('../logger')('security-manager');
const User = require('./user');
const SecurityError = require('./error');

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
    this._users = [];

    instance = this;
  }

  loader(filename) {
    try {
      const users = require('./loader')(filename) || [];
      this._users = users.reduce((acc, user) => {
        acc[user.id] = user;
        return acc;
      }, {});

      log.debug(`${users.length} user(s) added`);
    } catch (error) {
      log.error(error);
    }
  }

  /**
   * returns a User with usr and pwd
   *
   * @param {string} usr
   * @param {string} pwd
   * @return {User}
   * @memberof SecurityManager
   */
  checkCredentials(usr, pwd) {
    if (!usr || !pwd) {
      throw new SecurityError();
    }

    const user = this._users[usr];

    if (!user) {
      throw new SecurityError();
    }

    if (user.pwd !== pwd) {
      throw new SecurityError();
    }

    return user;
  }

  /**
   * create token from User object
   *
   * @param {User} user
   * @param {string} expiration
   * @return {string}
   * @memberof SecurityManager
   */
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

  /**
   * verify token
   *
   * @param {string} token
   * @return {User}
   * @memberof SecurityManager
   */
  verifyToken(token) {
    try {
      return jwt.verify(token, this.secret);
    } catch (error) {
      throw new SecurityError(error);
    }
  }

  /**
   * list of users
   *
   * @readonly
   * @return {Array<User>}
   * @memberof SecurityManager
   */
  get users() {
    const keys = Object.keys(this._users);
    return keys.map((key) => this._users[key]);
  }
}

module.exports = SecurityManager;
