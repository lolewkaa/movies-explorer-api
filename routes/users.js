const router = require('express').Router();
const { validationUpdateUser } = require('../utils/regex');

const { updateUser, getUserInfo } = require('../controllers/users');

router.get('/users/me', getUserInfo);
router.patch('/users/me', validationUpdateUser, updateUser);

module.exports = router;
