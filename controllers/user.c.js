const User = require('../models/user.m');
const Permission = require('../models/permission.m');
const passport = require('../middlewares/passport');

module.exports = {
    getAllUsers: async (req,  res, next) => {
        try {
            let userList = await User.getAllUsers();
            if(!userList) {
                res.status(404).send("There is no user in database !");
            }

            res.json(userList);
        } catch (error) {
            next(error);
        }
    },

    addNewUser: async (req, res, next) => {
        const {username, password, email, fullName, phone, address} = req.body;

        let newUser = {
            username,
            password,
            email,
            fullName,
            avatar: "",
            phone, 
            address,
            permission: Permission.USER 
        };

        try {
            let insertedUser = await User.addNewUser(newUser);
            if(!insertedUser) {
                res.status(404).send('Cannot add new user');
            } else {
                res.render('home', {
                    user: insertedUser
                });
            }

        } catch (error) {
            next(error);
        }
    },

    executeLogin: async (req, res, next) => {


        passport.authenticate('local', (err, user, info) => {
            if (err) {
                console.error("Error:", err);
                return res.status(500).send("Internal server error");
            }

            if (!user) {
                return res.render('login', {
                    errorMessage: 'Invalid username or password !',
                });
            }

            req.logIn(user, loginErr => {
                if (loginErr) {
                    console.error("Login Error:", loginErr);
                    return res.status(500).send("Error logging in");
                }

                return res.redirect("/");
            });
        })(req, res, next);

    },
}