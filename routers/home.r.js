const express = require('express');
const router=express.Router();

 const homeController=

router.get('/',require('../controllers/home.c').home);

module.exports = router;

