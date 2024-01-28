const router = require('express').Router();

const TransactionController = require('../controllers/transaction.c');

router.use((req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }

    console.log("Req.isAuthenticated() is failed, redirecting to the login page");
    res.redirect('/user/login');
});

//GET
router.get('/confirm', TransactionController.handleConfirmTransaction);


//POST
router.post('/create', TransactionController.handleCreateTransaction);

router.post('/validate', TransactionController.handleValidateTransaction);

module.exports = router;