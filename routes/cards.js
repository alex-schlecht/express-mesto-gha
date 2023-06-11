const router = require('express').Router();
const {
  getCards, createCard, likeCard, deleteCard, removeLikeCard,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', createCard);
router.delete('/:cardId', deleteCard);
router.put('/:cardId/likes', likeCard);
router.delete('/:cardId/likes', removeLikeCard);

module.exports = router;
