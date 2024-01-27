const express = require('express');
const router = express.Router();

const controllers = require('../controllers/admin.c');

router.get('/', controllers.getDashboard);

router.get('/management/products', require('../controllers/admin-products.c').manageProducts);

// for statistics
router.get('/sales/products', require('../controllers/admin.c').getSales);
router.get('/sales/categories', require('../controllers/admin.c').getSalesByCategories);

module.exports = router;

