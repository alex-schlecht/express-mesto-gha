const Card = require('../models/card');
const { errorHandler } = require('../utils/utils');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ cards }))
    .catch((err) => errorHandler(err, res));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const { _id } = req.user;

  Card.create({ name, link, owner: _id })
    .then((card) => card.populate('owner'))
    .then((card) => res.status(201).send({ card }))
    .catch((err) => errorHandler(err, res));
};

module.exports.deleteCard = (req, res) => {
  const _id = req.params.cardId;
  Card.findByIdAndDelete(_id)
    .orFail()
    .then((cards) => res.send({ cards }))
    .catch((err) => errorHandler(err, res));
};

module.exports.likeCard = (req, res) => {
  const { _id } = req.user;
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: _id } },
    { new: true },
  ).orFail()
    .populate('likes')
    .then((cards) => res.send({ cards }))
    .catch((err) => errorHandler(err, res));
};

module.exports.removeLikeCard = (req, res) => {
  const { _id } = req.user;
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: _id } },
    { new: true },
  ).orFail()
    .then((cards) => res.send({ cards }))
    .catch((err) => errorHandler(err, res));
};
