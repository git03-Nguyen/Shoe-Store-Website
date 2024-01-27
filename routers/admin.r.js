const express = require('express');
const router = express.Router();

const multer = require('multer');
const upload = multer();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const controllers = require('../controllers/admin.c');

// For statistics charts
router.get('/', controllers.getDashboard);
router.get('/sales/products', require('../controllers/admin.c').getSales);
router.get('/sales/categories', require('../controllers/admin.c').getSalesByCategories);


// For category management
router.get('/mangement/category', controllers.getCategoryManagement);

router.post('/category-management/edit', controllers.postEditCategory);

router.post('/category-management/create', controllers.postAddNewCategory);

router.post('/category-management/delete', controllers.postDeleteCategory);

// For product management
router.get('/management/products', require('../controllers/admin-products.c').manageProducts);

module.exports = router;