const router = require('express').Router();
const passport = require('passport');
const UserController = require('../controllers/user.c');

router.get('/login', (req, res, next) => {
    res.render('login');
})

router.get('/signup', (req, res, next) => {
    res.render('signup');
})

router.get('/logout', (req, res, next) => {
    req.logOut((err) => {
        if(err) {
            console.log(err);
        }
    });

    res.redirect('/user/login');
})

//POST
router.post('/login', UserController.executeLogin);

router.post('/signup', UserController.addNewUser);



module.exports = router;