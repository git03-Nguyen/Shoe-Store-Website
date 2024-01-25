const Account = require('../models/account.m');
const Admin = require('../models/admin.m');
const Transaction = require('../models/transaction.m');

module.exports = {
    handleGetHome: async (req, res, next) => {
        try {
            let admin = await Admin.getAdmin();
            let accList = await Account.getAllAccounts();
            let transList = await Transaction.getAllTransactions();

            res.render('home', {
                admin: admin,
                accList: accList,
                transList: transList
            });
        } catch (error) {
            next(error)
        }
    }
}