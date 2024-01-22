const User = require('../models/user.m');
const passport = require('passport');

module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            let userList = await User.getAllUsers();
            if (!userList) {
                res.status(404).send("There is no user in database !");
            }

            res.json(userList);
        } catch (error) {
            next(error);
        }
    },

    addNewUser: async (req, res, next) => {
        const { username, password, email, fullname, phonenumber, address } = req.body;

        let newUser = {
            username,
            password,
            email,
            fullname,
            avatar: "",
            phonenumber,
            address,
        };

        try {
            let insertedUser = await User.addNewUser(newUser);
            if (!insertedUser) {
                res.status(404).send('Cannot add new user');
            } else {
                res.redirect('/');
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

                console.log("req.user.username: " + req.user?.username);
                return res.redirect("/");
            });
        })(req, res, next);

    },

    updateGeneralProfile: async (req, res, next) => {
        const { data } = req.body;

        let updatedUser = await User.updateGeneralProfile(data.username, data.fullname, data.email, data.phonenumber, data.address);
        res.json(updatedUser);
    },
}