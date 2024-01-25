const router = require('express').Router();
const APIController = require('../controllers/api.c');

router.post('/account', APIController.getAccountByID);

module.exports = router;