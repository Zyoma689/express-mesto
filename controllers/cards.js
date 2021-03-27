const Card = require('../models/card');
const { notFoundError, internalServerError, getError } = require('../errors/errors');

const notFoundMessage = { message: 'Указанная карточка не найдена' };

const getCards = (req, res) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch(() => {
      internalServerError(res);
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => {
      Card.findById(card._id).populate(['owner', 'likes']).then((c) => {
        res.send(c);
      });
    })
    .catch((err) => {
      getError(res, err, notFoundMessage);
    });
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId)
    .then((card) => {
      if (!card) {
        notFoundError(res, notFoundMessage);
      }
      res.status(200).send({ message: 'Пост удалён' });
    })
    .catch((err) => {
      getError(res, err, notFoundMessage);
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, {
    $addToSet: { likes: req.user._id },
  },
  { new: true })
    .populate(['owner', 'likes'])
    .then((card) => {
      if (!card) {
        notFoundError(res, notFoundMessage);
      }
      res.status(200).send(card);
    })
    .catch((err) => getError(res, err, notFoundMessage));
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, {
    $pull: { likes: req.user._id },
  },
  { new: true })
    .populate(['owner', 'likes'])
    .then((card) => {
      if (!card) {
        notFoundError(res, notFoundMessage);
      }
      res.status(200).send(card);
    })
    .catch((err) => getError(res, err, notFoundMessage));
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
