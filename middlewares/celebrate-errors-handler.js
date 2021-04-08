const { isCelebrateError } = require('celebrate');

const celebrateErrorHandler = (err, req, res, next) => {
  if (isCelebrateError(err)) {
    const errorPath = err.details.get('body');
    if (!errorPath) {
      return res.status(400).send({ message: 'id должен быть валидным' });
    }
    return res.status(400).send({ message: errorPath.message });
  }
  return next(err);
};

module.exports = {
  celebrateErrorHandler,
};
