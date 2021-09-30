module.exports = (req, res, next) => {
  const { warehouse } = req;
  const { user } = warehouse;

  if (user.w) {
    return next();
  }

  return res.status(403).send({ message: 'you do not have write access' });
};
