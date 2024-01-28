const User = require('../models/user.m');
const axios = require('axios');
const https = require('https');

require('dotenv').config();
const jwt = require('jsonwebtoken');

const axiosInstance = axios.create({
    httpsAgent: new https.Agent({
        rejectUnauthorized: false, // Set this to false to ignore certificate errors
    }),
});

module.exports = {
    handleGetProfile: async (req, res, next) => {
        const token = jwt.sign({
            accountID: req.user.id,
            isAdmin: req.user.isadmin,
        }, process.env.JWT_SECRET, { expiresIn: '1h' });

        let userBalance = await axiosInstance.post("https://localhost:4000/api/account", {
            token: token
        });
        userBalance = userBalance?.data;


        if (userBalance) {
            jwt.verify(userBalance, process.env.JWT_SECRET, (err, content) => {
                if (err) {
                    throw err;
                }

                if (!content || !content.object) {
                    userBalance = null;
                } else {
                    userBalance = content.object.balance;
                }

                console.log("User Balance: " + userBalance);

                res.render('profile', {
                    user: req.user,
                    userBalance: userBalance,
                });

            })
        } else {
            next(new Error("Invalid response from Payment server"));
        }
    },

    handleCreateNewAccount: async (req, res, next) => {
        const token = jwt.sign({
            accountID: req.user.id,
            pincode: req.body?.pincode,
        }, process.env.JWT_SECRET, { expiresIn: '1h' });

        let newAccount = await axiosInstance.post("https://localhost:4000/api/create", {
            token: token
        });

        newAccount = newAccount?.data;

        if (newAccount) {
            jwt.verify(newAccount, process.env.JWT_SECRET, (err, content) => {
                if (err) {
                    throw err;
                }

                if (!content || !content.object) {
                    newAccount = null;
                } else {
                    userBalance = content.object;
                }

                res.json(newAccount);
            })


        } else {
            next(new Error("Invalid response from Payment server"));
        }
    }
}