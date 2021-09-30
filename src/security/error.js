const INVALID_TOKEN = 'TOKEN_INVALID';
const EXPIRED_TOKEN = 'TOKEN_EXPIRED';
const INVALID_CREDENTIALS = 'INVALID_CREDENTIALS';

class SecurityError extends Error {
  constructor(err = {}) {
    const { message = 'credentials' } = err;
    let code;
    let msg;

    if (message === 'jwt expired') {
      code = EXPIRED_TOKEN;
      msg = 'token has expired';
    } else if (message === 'jwt malformed') {
      code = INVALID_TOKEN;
      msg = 'token invalid';
    } else if (message === 'credentials') {
      code = INVALID_CREDENTIALS;
      msg = 'invalid user or/and password';
    }

    super(msg);
    this.code = code;
    this.originalError = err;
  }
}

module.exports = SecurityError;
