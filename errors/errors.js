const notFoundError = (res, message) => {
  res.status(404).send(message);
};

const badRequestError = (res, err) => {
  res.status(400).send({
    message: `${Object.values(err.errors)
      .map((error) => error.message).join(', ')}`,
  });
};

const internalServerError = (res) => {
  res.status(500).send({ message: 'Внутренняя ошибка сервера' });
};

const getError = (res, err, notFoundMessage) => {
  if (err.name === 'CastError') {
    notFoundError(res, notFoundMessage);
  } else if (err.name === 'ValidationError') {
    badRequestError(res, err);
  } else {
    internalServerError(res);
  }
};

module.exports = {
  notFoundError,
  badRequestError,
  internalServerError,
  getError,
};
