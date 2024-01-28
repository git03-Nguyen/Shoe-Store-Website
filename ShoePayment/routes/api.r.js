const router = require('express').Router();
const APIController = require('../controllers/api.c');

//GET

//POST
router.post('/account', APIController.getAccountByID);

router.post('/create', APIController.createNewAccount);

router.post('/transaction', APIController.createNewTransaction);

router.post('/order', APIController.getTransactionByOrder);

module.exports = router;