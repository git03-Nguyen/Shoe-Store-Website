const express = require('express');
const router = express.Router();

const multer = require('multer');
const upload=multer();

router.use(express.json());
router.use(express.urlencoded({extended: true}));
const controllers = require('../controllers/admin.c');

router.get('/', controllers.getDashboard);


router.get('/mangement/category', controllers.getCategoryManagement);

router.post('/category-management/edit', controllers.postEditCategory);

router.post('/category-management/create', controllers.postAddNewCategory);

router.post('/category-management/delete', controllers.postDeleteCategory);

router.get('/management/products', require('../controllers/admin-products.c').manageProducts);

// for statistics
router.get('/sales/products', require('../controllers/admin.c').getSales);
router.get('/sales/categories', require('../controllers/admin.c').getSalesByCategories);


module.exports = router;

