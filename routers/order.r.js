const router = require('express').Router();

const OrderController = require('../controllers/order.c');

router.use((req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }

    console.log("Req.isAuthenticated() is failed, redirecting to the login page");
    res.redirect('/user/login');
});

//GET
router.get('/', OrderController.renderOrderPage);


//POST


module.exports = router;