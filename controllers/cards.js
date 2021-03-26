const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.send(cards);
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => {
      res.send(card);
    });
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId)
    .then((card) => {
      res.send(card);
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, {
    $addToSet: { likes: req.user._id },
  },
  { new: true })
    .then((card) => {
      res.send(card);
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, {
    $pull: { likes: req.user._id},
  },
  { new: true })
    .then((card) => {
      res.send(card);
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
