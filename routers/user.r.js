const router = require('express').Router();

const UserController = require('../controllers/user.c');

const { isNotAuthenticated } = require('../utils/admin');

//GET
router.get('/login', isNotAuthenticated, (req, res, next) => {
    res.render('login', {
        title: 'Login'
    });
})

router.get('/signup', isNotAuthenticated, (req, res, next) => {
    res.render('signup', {
        title: 'Signup'
    });
})

router.get('/logout', (req, res, next) => {
    if (req.user) {
        req.logOut((err) => {
            if (err) {
                console.log(err);
            }
        });
    }

    res.redirect('/user/login');
})

router.get('/list', UserController.getAllUsers);


//POST

router.post('/login', isNotAuthenticated, UserController.executeLogin);

router.post('/signup', isNotAuthenticated, UserController.addNewUser);


module.exports = router;