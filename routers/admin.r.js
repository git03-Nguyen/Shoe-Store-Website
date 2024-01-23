const express = require('express');
const router = express.Router();

const controllers = require('../controllers/admin.c');
const { checkAdmin } = require('../utils/admin');

router.get('/', checkAdmin, controllers.getDashboard);

module.exports = router;

