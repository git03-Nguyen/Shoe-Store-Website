const Account = require('../models/account.m');
const Admin = require('../models/admin.m');
const Transaction = require('../models/transaction.m');


require('dotenv').config();

module.exports = {
    getAccountByID: async (req, res, next) => {
        try {
            let { accountID, isAdmin, secret } = req.body;
            if (secret != process.env.AXIOS_SECRET) {
                return res.json({
                    object: null,
                    message: "Secret is incorrect",
                })
            }

            if (isAdmin) {
                let data = await Admin.getAdmin();
                if (data.id != accountID) {
                    return res.json({
                        object: null,
                        message: "Admin's id is incorrect",
                    })
                }
                return res.json({
                    object: data,
                    message: "Admin is returned successfully",
                })
            }

            let data = await Account.getAccountByID(accountID);
            if (data) {
                return res.json({
                    object: data,
                    message: "Account is returned successfully",
                })
            }

            return res.json({
                object: null,
                message: "Invalid account",
            })
        } catch (error) {
            next(error);
        }

    },

    createNewAccount: async (req, res, next) => {
        try {
            let { accountID, pincode, secret } = req.body;

            if (secret != process.env.AXIOS_SECRET) {
                return res.json({
                    object: null,
                    message: "Secret is incorrect",
                })
            }

            let data = await Account.addNewAccount(accountID, pincode);
            if (!data) {
                return res.json({
                    object: null,
                    message: "Error creating new account",
                });
            }

            return res.json({
                object: data,
                message: "New account is created successfully",
            });
        } catch (error) {
            next(error);
        }

    },

    createNewTransaction: async (req, res, next) => {
        try {
            let { accountID, orderID, amount, secret } = req.body;

            if (secret != process.env.AXIOS_SECRET) {
                return res.json({
                    object: null,
                    message: "Secret is incorrect",
                })
            }

            let updatedAccount = await Account.handlePostPayment(accountID, amount);
            if (!updatedAccount) {
                return res.json({
                    object: null,
                    message: "Error handling POST payment by ACCOUNT",
                });
            }

            let updatedAdmin = await Admin.handleGetPayment(amount);
            if (!updatedAdmin) {
                updatedAccount = await Account.handlePaymentFailure(accountID, amount);

                if (!updatedAccount) {
                    return res.json({
                        object: null,
                        message: "Error handling POST payment by ADMIN\nError handling payment FAILURE by ACOUNT",
                    });
                }

                return res.json({
                    object: null,
                    message: "Error handling POST payment by ADMIN\nYour account transaction payment is returned SUCESSFULLY",
                });
            }

            let curDate = new Date();
            let newTransaction = await Transaction.addNewTransactionOrder(accountID, orderID, curDate, amount);
            if (!newTransaction) {
                return res.json({
                    object: null,
                    message: "Error handling creating new transaction",
                });
            }

            return res.json({
                object: newTransaction
            });

        } catch (error) {
            next(error);
        }
    },
}