/* istanbul ignore file */
const DEFAULT_SECRET = 'zySSZpeLMBNBLPmNYKj5vVgKGnkmFdLjScJB9rp8uxNDUnfanAfn2gzS24tgKVYZ';
const { PORT: port = 1337, SECRET: secret = DEFAULT_SECRET } = process.env;

return { port, secret };
