module.exports = {
  verifyToken: (token) => {
    if (token === 'EXPIRED') {
      throw new Error();
    }

    if (token === 'INVALID') {
      throw new Error();
    }

    if (token === 'VALID') {
      return 'token ok';
    }
  },
};
