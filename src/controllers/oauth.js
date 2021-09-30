module.exports = (securityManager) => {
  const login = (req, res) => {
    const { body = {} } = req;
    const { user: username, password } = body;

    try {
      const user = securityManager.checkCredentials(username, password);
      const token = securityManager.createToken(user);

      return res.status(200).send({ token_type: 'Bearer', access_token: token });
    } catch (error) {
      return res.status(401).send({ message: 'Invalid credentials' });
    }
  };

  return login;
};
