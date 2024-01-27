const express = require('express');
const router = express.Router();

const controllers = require('../controllers/admin.c');
const upload = require('../utils/multerUpload/productImage.upload');

router.get('/', controllers.getDashboard);

router.get('/management/products', require('../controllers/admin-products.c').manageProducts);

// admin api get products
router.get('/management/products/api/get', require('../controllers/admin-products.c').adminAPIGetProducts);

// admin api post product
router.post('/management/products/api/post/product', upload.single('imagefile'), require('../controllers/admin-products.c').adminAPIPostProduct);

// admin api get product by id
router.get('/management/products/api/get/product', require('../controllers/admin-products.c').adminAPIGetProductById);

module.exports = router;

