const express = require('express');
const router = express.Router();

const controllers = require('../controllers/admin.c');

router.get('/', controllers.getDashboard);

router.get('/management/products', require('../controllers/admin-products.c').manageProducts);

module.exports = router;

