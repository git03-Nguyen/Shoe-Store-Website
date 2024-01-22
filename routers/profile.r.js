const router = require('express').Router();


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


module.exports = router;