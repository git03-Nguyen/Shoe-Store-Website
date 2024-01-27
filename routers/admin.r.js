const express = require('express');
const router = express.Router();

const controllers = require('../controllers/admin.c');
const upload = require('../utils/multerUpload/productImage.upload');

router.get('/', controllers.getDashboard);

router.get('/management/products', require('../controllers/admin-products.c').manageProducts);

router.post('/management/products/api/post/product', upload.single('imagefile'), require('../controllers/admin-products.c').adminAPIPostProduct);

module.exports = router;

