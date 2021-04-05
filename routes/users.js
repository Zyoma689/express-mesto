const router = require('express').Router();

const {
  getUsers, getUserById, createUser, updateUser, updateAvatar, login,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getUserById);
router.post('/signup', createUser);
router.post('/signin', login);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
