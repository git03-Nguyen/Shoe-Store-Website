const express = require('express');
const router = express.Router();

const controllers = require('../controllers/admin.c');

router.get('/', controllers.getDashboard);

router.get('/mangement/category', controllers.getCategoryManagement);

module.exports = router;

