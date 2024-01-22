const express = require('express');
const router = express.Router();

// get shop page
router.get('/', require('../controllers/shop.c').getAllProductAtPage);

// get shop-cart page
router.get('/cart', (req, res) => { });

// get shop-favorite page
router.get('favorite', (req, res) => { });

// get shop-detail page
router.get('/detail', (req, res) => { });

// get shop-checkout page
router.get('/checkout', (req, res) => { });

module.exports = router;