const router = require('express').Router();
const { validationUpdateUser } = require('../utils/regex');

const { updateUser, getUserInfo } = require('../controllers/users');

router.get('/me', getUserInfo);
router.patch('/me', validationUpdateUser, updateUser);

module.exports = router;
