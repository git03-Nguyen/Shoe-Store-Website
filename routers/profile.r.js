const router = require('express').Router();
const UserController = require('../controllers/user.c');

router.use((req, res, next) => {
    if(req.isAuthenticated()) {
        return next();
    }

    console.log("Req.isAuthenticated() is failed, redirecting to the login page");
    res.redirect('/user/login');
});


//GET
router.get('/', (req, res, next) => {
    res.render('profile', {
        user: req.user
    });
})


//POST
router.post('/update/general', UserController.updateGeneralProfile);

module.exports = router;