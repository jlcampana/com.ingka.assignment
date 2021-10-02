/* istanbul ignore file */
module.exports = {
  status: (code) => ({
    send: (msg) => ({
      code,
      msg,
    }),
  }),
};
