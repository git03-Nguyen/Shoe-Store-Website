const express = require('express');
const router = express.Router();

const multer = require('multer');
const upload = multer();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const controllers = require('../controllers/admin.c');
const uploadProduct = require('../utils/multerUpload/productImage.upload');
const uploadAvatar = require('../utils/multerUpload/avatarUser.upload');

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
router.get('/products', controllers.getProductManagement);
router.get('/products/get', controllers.getProducts);
router.post('/products/edit', controllers.postEditProduct);
router.post('/products/delete', controllers.postDeleteProduct);
router.post('/products/create', /*uploadProduct.single('imagefile'),*/ controllers.postAddNewProduct);

// For user management
router.get('/users', controllers.getUserManagement);
router.post('/users/delete', controllers.postDeleteUser);
router.post('/users/edit', controllers.postEditUser);
router.post('/users/upload', uploadAvatar.single('avatar'), controllers.postUploadAvatar);
router.post('/users/create', controllers.postCreateUser);

// ------------

// // For product management
// router.get('/management/products', require('../controllers/admin-products.c').manageProducts);


// router.get('/management/products/api/get', require('../controllers/admin-products.c').adminAPIGetProducts);

// // admin api post product
// router.post('/management/products/api/post/product', uploadProduct.single('imagefile'), require('../controllers/admin-products.c').adminAPIPostProduct);

// // admin api get product by id
// router.get('/management/products/api/get/product', require('../controllers/admin-products.c').adminAPIGetProductById);

// // admin api delete product by id
// router.delete('/management/products/api/delete/product', require('../controllers/admin-products.c').adminAPIDeleteProductById);


module.exports = router;