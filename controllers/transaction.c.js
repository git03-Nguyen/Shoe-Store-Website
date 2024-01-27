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
            let { username, orderID, amount } = req.body;

            if (username != req.user.username) {
                return res.send("Incorrect user");
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

    handleValidateTransaction: async (req, res, next) => {
        try {
            let pincode = req.body.pincode;

            let returnedAccount = await axiosInstance.post("https://localhost:4000/api/account", {
                accountID: req.user.id,
                isAdmin: req.user.isadmin,
                secret: process.env.AXIOS_SECRET
            });

            if (!returnedAccount || !returnedAccount.data || !returnedAccount.data.object) {
                return res.json({
                    object: null,
                    message: "Error loading account information from database"
                });
            }

            returnedAccount = returnedAccount.data.object;
            let state = await bcrypt.compare(pincode, returnedAccount.pincode);

            if (!state) {
                return res.json({
                    object: null,
                    message: "Incorrect pincode !"
                });
            }

            return res.json({
                object: returnedAccount,
                message: "Account is returned successfully"
            });
        } catch (error) {
            next(error);
        }
    },
}