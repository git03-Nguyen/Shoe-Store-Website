const router = require('express').Router();
const AccountController = require('../controllers/account.c');

router.get('/list', AccountController.getAllAccounts);

module.exports = router;