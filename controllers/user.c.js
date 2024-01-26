const User = require('../models/user.m');
const passport = require('passport');
const path = require('path');

module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            let userList = await User.getAllUsers();
            if (!userList) {
                return res.json(null);
            }

            return res.json(userList);
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
                res.redirect('/user/login');
            }

        } catch (error) {
            next(error);
        }
    },

    executeLogin: async (req, res, next) => {
        passport.authenticate('local', (err, user, info) => {
            if (err) {
                console.error("Error:", err);
                return res.json(null);
            }

            if (!user) {
                return res.json(null);
            }

            req.logIn(user, loginErr => {
                if (loginErr) {
                    console.error("Login Error:", loginErr);
                    return res.json(null);
                }

                console.log("req.user.username: " + req.user?.username);
                return res.json(req.user);
            });
        })(req, res, next);

    },

    updateGeneralProfile: async (req, res, next) => {
        try {
            const data = req.body;

            console.log("Data from general profile updating: ");
            console.log(data);

            const avatarExtension = req.file.originalname.split('.').pop();
            const avatar = `/img/avatars/avatar_${req.user.id}.${avatarExtension}`;

            let updatedUser = await User.updateGeneralProfile(data.username, data.fullname, data.email, data.phonenumber, data.address, avatar);
            console.log("Updated user's avatar: " + updatedUser.avatar);

            res.json(updatedUser);
        } catch (error) {
            next(error)
        }
    },

    updatePasswordProfile: async (req, res, next) => {
        const { data } = req.body;

        let updatedUser = await User.updatePasswordProfile(req.user.id, data.curPassword, data.newPassword);
        res.json(updatedUser);
    },
}