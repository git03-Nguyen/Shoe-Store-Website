const router = require('express').Router();
const PaymentController = require('../controllers/payment.c')

router.post('/', PaymentController.handlePayment);

module.exports = router;