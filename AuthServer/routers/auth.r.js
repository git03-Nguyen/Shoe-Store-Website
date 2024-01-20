const router = require('express').Router();
passport = require('../middlewares/passport');

router.get('/google', passport.authenticate('google', {
        scope: ['email', 'profile']
    }
));

router.get('/google/callback', passport.authenticate('google', {
        successRedirect: '/',
        failureRedirect: '/user/login'
    }
));

module.exports = router;