const express = require('express');
const router = express.Router();

const multer = require('multer');
const upload = multer();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const controllers = require('../controllers/admin.c');
const upload = require('../utils/multerUpload/productImage.upload');

// For statistics charts
router.get('/', controllers.getDashboard);
router.get('/sales/products', require('../controllers/admin.c').getSales);
router.get('/sales/categories', require('../controllers/admin.c').getSalesByCategories);

// For category management
router.get('/categories', controllers.getCategoryManagement);

router.post('/category-management/edit', controllers.postEditCategory);

router.post('/category-management/create', controllers.postAddNewCategory);

router.post('/category-management/delete', controllers.postDeleteCategory);

// For product management
router.get('/management/products', require('../controllers/admin-products.c').manageProducts);


router.get('/management/products/api/get', require('../controllers/admin-products.c').adminAPIGetProducts);

// admin api post product
router.post('/management/products/api/post/product', upload.single('imagefile'), require('../controllers/admin-products.c').adminAPIPostProduct);

// admin api get product by id
router.get('/management/products/api/get/product', require('../controllers/admin-products.c').adminAPIGetProductById);

// admin api delete product by id
router.delete('/management/products/api/delete/product', require('../controllers/admin-products.c').adminAPIDeleteProductById);


module.exports = router;