const Account = require('../models/account.m');

module.exports = {
    getAllAccounts: async (req, res, next) => {
        try {
            let data = await Account.getAllAccounts();
            res.json(data);
        } catch (error) {
            next(error);
        }
    }
}