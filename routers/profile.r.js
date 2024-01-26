const router = require('express').Router();
const UserController = require('../controllers/user.c');
const ProfileController = require('../controllers/profile.c');
const upload = require('../utils/multerUpload/avatarUser.upload');

router.use((req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }

    console.log("Req.isAuthenticated() is failed, redirecting to the login page");
    res.redirect('/user/login');
});


//GET
router.get('/', ProfileController.handleGetProfile);


//POST
router.post('/update/general', upload.single('avatar'), UserController.updateGeneralProfile);
router.post('/update/password', UserController.updatePasswordProfile);

router.post('/create', ProfileController.handleCreateNewAccount);

module.exports = router;