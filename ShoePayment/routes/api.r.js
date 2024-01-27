const router = require('express').Router();
const APIController = require('../controllers/api.c');

router.post('/account', APIController.getAccountByID);

router.post('/create', APIController.createNewAccount);

router.post('/transaction', APIController.createNewTransaction);

module.exports = router;