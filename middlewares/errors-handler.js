const errorsHandler = (err, req, res, next) => {
  let { statusCode = 500, message = 'На сервере произошла ошибка' } = err;
  const { name } = err;
  if (name === 'ValidationError') {
    statusCode = 400;
    message = `${Object.values(err.errors).map((error) => error.message).join(', ')}`;
  } else if (name === 'CastError') {
    statusCode = 404;
    message = 'Карточка или пользователь не найдены';
  } else if (err.name === 'MongoError' && err.code === 11000) {
    statusCode = 409;
    message = 'Пользователь с таким email уже существует';
  }
  res.status(statusCode).send({ message });
  next();
};

module.exports = { errorsHandler };
