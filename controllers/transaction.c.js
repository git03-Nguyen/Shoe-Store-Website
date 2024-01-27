const bcrypt = require('bcrypt');
const axios = require('axios');
const https = require('https');
const jwt = require('jsonwebtoken');

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

            const token = jwt.sign({
                accountID: req.user.id,
                orderID: orderID,
                amount: amount,
            }, process.env.JWT_SECRET, { expiresIn: '1h' });


            let updatedUser = await axiosInstance.post("https://localhost:4000/api/transaction", {
                token: token
            });

            updatedUser = updatedUser?.data;
            if (updatedUser) {
                jwt.verify(updatedUser, process.env.JWT_SECRET, (err, content) => {
                    if (err) {
                        throw err;
                    }

                    if (!content) {
                        return res.json(null);
                    }

                    if (!content.object) {
                        return res.send(content.message);
                    }

                    updatedUser = content.object;
                    return res.redirect('https://localhost:3000/profile');
                })
            } else {
                next(new Error("Invalid response from Payment server"));
            }
        } catch (error) {
            next(error);
        }
    },

    handleValidateTransaction: async (req, res, next) => {
        try {
            let pincode = req.body.pincode;

            const token = jwt.sign({
                accountID: req.user.id,
                isAdmin: req.user.isadmin,
            }, process.env.JWT_SECRET, { expiresIn: '1h' });

            let returnedAccount = await axiosInstance.post("https://localhost:4000/api/account", {
                token: token
            });

            returnedAccount = returnedAccount?.data;

            if (returnedAccount) {
                jwt.verify(returnedAccount, process.env.JWT_SECRET, async (err, content) => {
                    if (err) {
                        throw err;
                    }

                    if (!content || !content.object) {
                        return res.json({
                            object: null,
                            message: "Error loading account information from database"
                        });
                    }

                    returnedAccount = content.object;
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
                })
            } else {
                next(new Error("Invalid response from Payment server"));
            }
        } catch (error) {
            next(error);
        }
    },
}