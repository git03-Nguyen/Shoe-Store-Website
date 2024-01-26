const DBProvider = require('../utils/dbAccount');

class Account {
    constructor(id, balance) {
        this.id = id;
        this.balance = balance;
    }

    static clone(obj) {
        if (!obj || !obj.id) {
            return null;
        }

        return new Account(obj.id, obj.balance);
    }

    static async getAllAccounts() {
        let data = await DBProvider.getAllAccounts();
        if (data) {
            return data.map(acc => Account.clone(acc));
        }

        return null;
    }

    static async addNewAccount(accountID) {
        let data = await DBProvider.addNewAccount(accountID);
        if (data) {
            return Account.clone(data);
        }

        return null;
    }

    static async getAccountByID(accountID) {
        let data = await DBProvider.getAccountByID(accountID);
        if (data) {
            return Account.clone(data);
        }

        return null;
    }

    static async handlePostPayment(accID, transactionPrice) {
        let data = await DBProvider.handlePostPayment(accID, transactionPrice);
        if (data) {
            return Account.clone(data);
        }

        return null;
    }

    static async handlePaymentFailure(accID, transactionPrice) {
        let data = await DBProvider.handlePaymentFailure(accID, transactionPrice);
        if (data) {
            return Account.clone(data);
        }

        return null;
    }
}

module.exports = Account;