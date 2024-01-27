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

module.exports = router;

