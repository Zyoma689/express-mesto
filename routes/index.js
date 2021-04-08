const router = require('express').Router();
const { createUser, login } = require('../controllers/users');
const { createUserValidator, loginValidator } = require('../utils/celebrate-validators');
const auth = require('../middlewares/auth');
const userRouter = require('./users');
const cardRouter = require('./cards');

router.post('/signup', createUserValidator, createUser);
router.post('/signin', loginValidator, login);
router.use(auth);
router.use('/users', userRouter);
router.use('/cards', cardRouter);

module.exports = router;
