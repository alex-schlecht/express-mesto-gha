const router = require('express').Router();
const bcrypt = require('bcrypt');
const { celebrate, Joi } = require('celebrate');
const { URI_REGEX } = require('../utils/constants');
const {
  getUser, getUserInfo, getAllUsers, updateUserProfile, updateUserAvatar,
} = require('../controllers/users');
const Unauthorized = require('../errors/Unauthorized');

router.get('/', getAllUsers);
router.get('/me', getUserInfo);

router.get('/:userId', celebrate({
  params: Joi.object({
    userId: Joi.string().length(24).hex().required(),
  }),
}), getUser);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUserProfile);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi
      .string()
      .pattern(URI_REGEX),
  }),
}), updateUserAvatar);

module.exports = router;
