const User = require('../models/user.m');
const axios = require('axios');
const https = require('https');

require('dotenv').config();

const axiosInstance = axios.create({
    httpsAgent: new https.Agent({
        rejectUnauthorized: false, // Set this to false to ignore certificate errors
    }),
});

module.exports = {
    handleGetProfile: async (req, res, next) => {
        let userBalance = await axiosInstance.post("https://localhost:4000/api/account", {
            accountID: req.user.id,
            isAdmin: req.user.isadmin,
            secret: process.env.AXIOS_SECRET
        });

        console.log("User from axios: ");
        console.log(userBalance.data);

        if (userBalance && userBalance.data && userBalance.data.object) {
            userBalance = userBalance.data.object.balance;
        } else {
            userBalance = null;
        }

        console.log("User balance: ");
        console.log(userBalance);

        res.render('profile', {
            user: req.user,
            userBalance: userBalance,
        });
    }
}