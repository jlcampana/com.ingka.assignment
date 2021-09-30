/* istanbul ignore file */
const contentSecurityPolicy = false;
const serverAddress = '0.0.0.0';
const DEFAULT_SECRET = 'zySSZpeLMBNBLPmNYKj5vVgKGnkmFdLjScJB9rp8uxNDUnfanAfn2gzS24tgKVYZ';
const { PORT: port = 1337, SECRET: secret = DEFAULT_SECRET } = process.env;

module.exports = { port, secret, serverAddress, contentSecurityPolicy };
