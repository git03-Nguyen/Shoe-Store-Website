const router = require('express').Router();
const HomeController = require('../controllers/home.c');

router.get('/', HomeController.handleGetHome);


module.exports = router;