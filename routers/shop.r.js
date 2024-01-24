const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.mw');

// get shop page
router.get('/', require('../controllers/shop.c').shop);

// api: get shop
router.get('/api/get', require('../controllers/shop.c').shopAPIGet);

// api: post add-cart
router.post('/api/post/add-cart', auth.checkAuthenticatedForAddToCart, require('../controllers/shop.c').shopApiPostAddCart);

// get shop-detail page
router.get('/detail', require('../controllers/shop-detail.c').detail);

// get shop-cart page
router.get('/cart', (req, res) => { res.render('shop/shop-cart'); });

// get shop-favorite page
router.get('favorite', (req, res) => { });

// get shop-checkout page
router.get('/checkout', (req, res) => { });

module.exports = router;