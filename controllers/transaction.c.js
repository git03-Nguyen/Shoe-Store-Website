const bcrypt = require('bcrypt');
const axios = require('axios');
const https = require('https');

require('dotenv').config();

const axiosInstance = axios.create({
    httpsAgent: new https.Agent({
        rejectUnauthorized: false, // Set this to false to ignore certificate errors
    }),
});
module.exports = {
    handleConfirmTransaction: async (req, res, next) => {
        try {
            let { orderID, amount } = req.query;

            res.render('transaction-confirm', {
                user: req.user,
                orderID: orderID,
                amount: amount,
            });

        } catch (error) {
            next(error);
        }
    },

    handleCreateTransaction: async (req, res, next) => {
        try {
            let { username, orderID, amount, password } = req.body;
            let state = await bcrypt.compare(password, req.user.password);

            if (username != req.user.username || !state) {
                console.log(`Input: ${username} vs User: ${req.user.username}`);
                console.log(`Input: ${password}`);
                return res.send("Incorrect username or password");
            }

            let updatedUser = await axiosInstance.post("https://localhost:4000/api/transaction", {
                accountID: req.user.id,
                orderID: orderID,
                amount: amount,
                secret: process.env.AXIOS_SECRET
            });

            if (!updatedUser || !updatedUser.data) {
                return res.send("Error linking to payment server");
            }

            if (!updatedUser.data.object) {
                return res.send(updatedUser.data.message);
            }

            updatedUser = updatedUser.data.object;


            return res.redirect('https://localhost:3000/profile');
        } catch (error) {
            next(error);
        }
    },
}