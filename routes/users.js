const router = require('express').Router();
const {
  getUser, getAllUsers, createUser, updateUserProfile, updateUserAvatar,
} = require('../controllers/users');

router.get('/', getAllUsers);
router.get('/:userId', getUser);
router.post('/', createUser);
router.patch('/me', updateUserProfile);
router.patch('/me/avatar', updateUserAvatar);
module.exports = router;
