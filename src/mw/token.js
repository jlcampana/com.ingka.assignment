const BEARER_TYPE = 'bearer';

module.exports = (securityManager) => (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(403).send({ message: 'Security token not found' });
  }

  const [type, token] = req.headers.authorization && req.headers.authorization.split(' ');

  if (!token || !type || type.toLowerCase() !== BEARER_TYPE) {
    return res.status(403).send({ message: 'Security token not found' });
  }

  try {
    const user = securityManager.verifyToken(token);
    req.warehouse = { user };

    return next();
  } catch (error) {
    return res.status(401).send({ message: 'The security token is invalid or has expired' });
  }
};
