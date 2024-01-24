const express = require('express');
const router = express.Router();

const controllers = require('../controllers/admin.c');

router.get('/', controllers.getDashboard);

module.exports = router;

