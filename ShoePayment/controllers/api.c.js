const Account = require('../models/account.m');
const Admin = require('../models/admin.m');
const Transaction = require('../models/transaction.m');

const jwt = require('jsonwebtoken');

require('dotenv').config();

module.exports = {
    getAccountByID: async (req, res, next) => {
        try {
            let { token } = req.body;
            let returnedData = {
                object: null,
                message: "",
            }

            jwt.verify(token, process.env.JWT_SECRET, async (err, content) => {
                if (err) {
                    returnedData.message = "Error verifying token from Store server";

                    let returnedToken = jwt.sign(returnedData, process.env.JWT_SECRET, { expiresIn: '1h' });
                    return res.json(returnedToken);
                };

                if (!content || !content.accountID) {
                    returnedData.message = "Invalid value from Store server";

                    let returnedToken = jwt.sign(returnedData, process.env.JWT_SECRET, { expiresIn: '1h' });
                    return res.json(returnedToken);
                };

                let accountID = content.accountID;
                let isAdmin = content.isAdmin;

                if (isAdmin) {
                    let data = await Admin.getAdmin();
                    if (data.id != accountID) {
                        returnedData.message = "Admin's id is incorrect";

                        let returnedToken = jwt.sign(returnedData, process.env.JWT_SECRET, { expiresIn: '1h' });
                        return res.json(returnedToken);
                    }
                    returnedData.object = data;
                    returnedData.message = "Admin is returned successfully";

                    let returnedToken = jwt.sign(returnedData, process.env.JWT_SECRET, { expiresIn: '1h' });
                    return res.json(returnedToken);
                }

                let data = await Account.getAccountByID(accountID);
                if (data) {
                    returnedData.object = data;
                    returnedData.message = "Account is returned successfully";

                    let returnedToken = jwt.sign(returnedData, process.env.JWT_SECRET, { expiresIn: '1h' });
                    return res.json(returnedToken);
                }
                returnedData.message = "Invalid account";

                let returnedToken = jwt.sign(returnedData, process.env.JWT_SECRET, { expiresIn: '1h' });
                return res.json(returnedToken);
            })
        } catch (error) {
            next(error);
        }

    },

    createNewAccount: async (req, res, next) => {
        try {
            let { token } = req.body;
            let returnedData = {
                object: null,
                message: "",
            }

            jwt.verify(token, process.env.JWT_SECRET, async (err, content) => {
                if (err) {
                    returnedData.message = "Error verifying token from Store server";

                    let returnedToken = jwt.sign(returnedData, process.env.JWT_SECRET, { expiresIn: '1h' });
                    return res.json(returnedToken);
                }

                if (!content || !content.accountID || !content.pincode) {
                    returnedData.message = "Invalid value from Store server";

                    let returnedToken = jwt.sign(returnedData, process.env.JWT_SECRET, { expiresIn: '1h' });
                    return res.json(returnedToken);
                };

                let { accountID, pincode } = content;

                let data = await Account.addNewAccount(accountID, pincode);
                if (!data) {
                    returnedData.message = "Error creating new account";

                    let returnedToken = jwt.sign(returnedData, process.env.JWT_SECRET, { expiresIn: '1h' });
                    return res.json(returnedToken);
                }
                returnedData.object = data;
                returnedData.message = "New account is created successfully";

                let returnedToken = jwt.sign(returnedData, process.env.JWT_SECRET, { expiresIn: '1h' });
                return res.json(returnedToken);
            })

        } catch (error) {
            next(error);
        }

    },

    createNewTransaction: async (req, res, next) => {
        try {
            let { token } = req.body;
            let returnedData = {
                object: null,
                message: "",
            };

            jwt.verify(token, process.env.JWT_SECRET, async (err, content) => {
                if (err) {
                    returnedData.message = "Error verifying token from Store server";

                    let returnedToken = jwt.sign(returnedData, process.env.JWT_SECRET, { expiresIn: '1h' });
                    return res.json(returnedToken);
                }

                if (!content || !content.accountID || !content.orderID || !content.amount) {
                    returnedData.message = "Invalid value from Store server";

                    let returnedToken = jwt.sign(returnedData, process.env.JWT_SECRET, { expiresIn: '1h' });
                    return res.json(returnedToken);
                }

                let { accountID, orderID, amount } = content;

                let updatedAccount = await Account.handlePostPayment(accountID, amount);
                if (!updatedAccount) {
                    returnedData.message = "Error handling POST payment by ACCOUNT";

                    let returnedToken = jwt.sign(returnedData, process.env.JWT_SECRET, { expiresIn: '1h' });
                    return res.json(returnedToken);
                }

                let updatedAdmin = await Admin.handleGetPayment(amount);
                if (!updatedAdmin) {
                    updatedAccount = await Account.handlePaymentFailure(accountID, amount);

                    if (!updatedAccount) {
                        returnedData.message = "Error handling POST payment by ADMIN\nError handling payment FAILURE by ACCOUNT";

                        let returnedToken = jwt.sign(returnedData, process.env.JWT_SECRET, { expiresIn: '1h' });
                        return res.json(returnedToken);
                    }
                    returnedData.message = "Error handling POST payment by ADMIN\nYour account transaction payment is returned SUCESSFULLY";

                    let returnedToken = jwt.sign(returnedData, process.env.JWT_SECRET, { expiresIn: '1h' });
                    return res.json(returnedToken);
                }

                let curDate = new Date();
                let newTransaction = await Transaction.addNewTransactionOrder(accountID, orderID, curDate, amount);
                if (!newTransaction) {
                    returnedData.message = "Error handling creating new transaction";

                    let returnedToken = jwt.sign(returnedData, process.env.JWT_SECRET, { expiresIn: '1h' });
                    return res.json(returnedToken);
                }
                returnedData.object = newTransaction;
                returnedData.message = "New transaction is created successfully";

                let returnedToken = jwt.sign(returnedData, process.env.JWT_SECRET, { expiresIn: '1h' });
                return res.json(returnedToken);
            });

        } catch (error) {
            next(error);
        }
    },

    getTransactionByOrder: async (req, res, next) => {
        try {
            let { token } = req.body;
            let returnedData = {
                object: null,
                message: "",
            }

            jwt.verify(token, process.env.JWT_SECRET, async (err, content) => {
                if (err) {
                    returnedData.message = "Error verifying token from Store server";

                    let returnedToken = jwt.sign(returnedData, process.env.JWT_SECRET, { expiresIn: '1h' });
                    return res.json(returnedToken);
                }

                if (!content || !content.orderID) {
                    returnedData.message = "Invalid value from Store server";

                    let returnedToken = jwt.sign(returnedData, process.env.JWT_SECRET, { expiresIn: '1h' });
                    return res.json(returnedToken);
                };

                let { orderID } = content;

                let data = await Transaction.getTransactionByOrder(orderID);

                if (!data) {
                    returnedData.message = "Error get order with id " + orderID;

                    let returnedToken = jwt.sign(returnedData, process.env.JWT_SECRET, { expiresIn: '1h' });
                    return res.json(returnedToken);
                }
                returnedData.object = data;
                returnedData.message = "Order is returned successfully";

                let returnedToken = jwt.sign(returnedData, process.env.JWT_SECRET, { expiresIn: '1h' });
                return res.json(returnedToken);
            })

        } catch (error) {
            next(error);
        }
    },
}