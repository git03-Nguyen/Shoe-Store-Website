const express = require('express');
const router = express.Router();

// get contact page
router.get('/', require('../controllers/contact.c').contact);

module.exports = router;