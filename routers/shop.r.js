const express = require('express');
const router = express.Router();

// get shop page
router.get('/', null);

// get shop-cart page
router.get('/cart', null);

// get shop-favorite page
router.get('favorite', null);

// get shop-detail page
router.get('/detail', null);

// get shop-checkout page
router.get('/checkout', null);

module.exports = router;