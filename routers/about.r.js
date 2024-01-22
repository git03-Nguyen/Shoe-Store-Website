const express = require('express');
const router = express.Router();

// get about page
router.get('/', require('../controllers/about.c').about);

module.exports = router;