const express = require('express');
const router = express.Router();

const controllers = require('../controllers/admin.c');

router.get('/', controllers.getDashboard);

router.get('/mangement/products', controllers.);

module.exports = router;

