const Account = require('../models/account.m');
const Admin = require('../models/admin.m');

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
                console.log(msg);
                return res.send(msg)
            }

            isReceived = true;
            //TODO: add to payment transaction

            res.redirect('/');
        } catch (error) {
            next(error);
        }
    }
}