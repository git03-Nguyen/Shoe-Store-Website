const router = require('express').Router();

router.use((req, res, next) => {
    if(req.isAuthenticated()) {
        return next();
    }

    console.log("Req.isAuthenticated() is failed, redirecting to the login page");
    res.redirect('/user/login');
});

router.get('/', (req, res, next) => {
    res.render('home', {
        user: req.user
    });
})


module.exports = router;