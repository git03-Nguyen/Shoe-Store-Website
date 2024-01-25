const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.mw');

// get shop page
router.get('/', require('../controllers/shop.c').shop);

// api: get shop
router.get('/api/get', require('../controllers/shop.c').shopAPIGet);

// api: post add-cart
router.post('/api/post/add-cart', auth.checkAuthenticatedForAddToCart, require('../controllers/shop.c').shopApiPostAddCart);

// api: post remove cartlist
router.post('/api/post/remove-cart', auth.checkAuthenticatedForRemoveCart, require('../controllers/shop.c').shopApiPostRemoveCart);

// api: post remove cartlist
router.post('/api/post/update-cart', auth.checkAuthenticatedForUpdateCart, require('../controllers/shop.c').shopApiPostUpdateCart);

// api: post order
router.post('/api/post/order', auth.checkAuthenticatedForOrder, require('../controllers/shop.c').shopApiPostOrder);

// get shop-detail page
router.get('/detail', require('../controllers/shop-detail.c').detail);

// get shop-cart page
router.get('/cart', auth.checkAuthenticatedRedirectLogin, require('../controllers/shop-cart.c').cart);

// get shop-favorite page
router.get('favorite', (req, res) => { });

// get shop-checkout page
router.get('/checkout', auth.checkAuthenticatedRedirectLogin, require('../controllers/shop-checkout.c').checkout);

module.exports = router;