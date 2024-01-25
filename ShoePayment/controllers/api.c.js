const Account = require('../models/account.m');
const Admin = require('../models/admin.m');
const Transaction = require('../models/transaction.m');


module.exports = {
    getAccountByID: async (req, res, next) => {
        let { accountID, isAdmin, secret } = req.body;
        if (secret != process.env.AXIOS_SECRET) {
            return res.json({
                object: null,
                message: "secret is incorrect",
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
    },
}