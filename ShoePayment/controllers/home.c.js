const Account = require('../models/account.m');
const Admin = require('../models/admin.m');

module.exports = {
    handleGetHome: async (req, res, next) => {
        try {
            let admin = await Admin.getAdmin();
            let accList = await Account.getAllAccounts();

            res.render('home', {
                admin: admin,
                accList: accList
            });
        } catch (error) {
            next(error)
        }
    }
}