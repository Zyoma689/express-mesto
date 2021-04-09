const { BadRequestError } = require('../errors/400_bad-request-error');
const { NotFoundError } = require('../errors/404_not-found-error');
const { ConflictError } = require('../errors/409_conflict-error');

const errorsHandler = (err) => {
  const { name } = err;
  if (name === 'ValidationError') {
    throw new BadRequestError(`${Object.values(err.errors).map((error) => error.message).join(', ')}`);
  } else if (name === 'CastError') {
    throw new NotFoundError('Карточка или пользователь не найдены');
  } else if (err.name === 'MongoError' && err.code === 11000) {
    throw new ConflictError('Пользователь с таким email уже существует');
  }
};

module.exports = { errorsHandler };
