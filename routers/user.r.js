const router = require('express').Router();

const UserController = require('../controllers/user.c');

//GET
router.get('/login', (req, res, next) => {
    res.render('login');
})

router.get('/signup', (req, res, next) => {
    res.render('signup');
})

router.get('/logout', (req, res, next) => {
    if(req.user) {
        req.logOut((err) => {
            if(err) {
                console.log(err);
            }
        });
    }

    res.redirect('/user/login');
})

//POST

router.post('/login', UserController.executeLogin);

router.post('/signup', UserController.addNewUser);


module.exports = router;