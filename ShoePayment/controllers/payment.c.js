const Account = require('../models/account.m');
const Admin = require('../models/admin.m');
const Transaction = require('../models/transaction.m');

module.exports = {
    handlePayment: async (req, res, next) => {

        const { payment_account_id, payment_amount } = req.body;

        let isSent = false;
        let isReceived = false;

        try {
            let updatedAccount = await Account.handlePostPayment(payment_account_id, payment_amount);
            if (!updatedAccount) {
                let msg = `ERROR: Failed to handle POST payment by ACCOUNT with accID=${payment_account_id}, amount=${payment_amount}`;
                console.log(msg);
                return res.send(msg)
            }

            isSent = true;
            let updatedAdmin = await Admin.handleGetPayment(payment_amount);
            if (!updatedAdmin) {
                let msg = `ERROR: Failed to handle GET payment by ADMIN with accID=${payment_account_id}, amount=${payment_amount}`;

                updatedAccount = await Account.handlePaymentFailure(payment_account_id, payment_amount);
                if (!updatedAccount) {
                    msg += `\nERROR: Failed to handle payment FAILURE by ACCOUNT with accID=${payment_account_id}, amount=${payment_amount}`;
                }

                console.log(msg);
                return res.send(msg);

            }

            isReceived = true;
            //TODO: add to payment transaction
            let curDate = new Date();
            let updatedTransaction = await Transaction.addNewTransaction(payment_account_id, curDate, payment_amount)
            if (!updatedTransaction) {
                let msg = `ERROR: Failed to add new transaction !`;
                console.log(msg);
                return res.send(msg);
            }

            return res.redirect('/');
        } catch (error) {
            next(error);
        }
    }
}