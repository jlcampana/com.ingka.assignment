const users = {
  u1: 'p1',
};

module.exports = {
  checkCredentials: (u, p) => {
    const user = users[u];
    if (!user || user !== p) {
      throw new Error();
    } else {
      return user;
    }
  },
  createToken: (u) => 'THIS_IS_A_TOKEN',
};
