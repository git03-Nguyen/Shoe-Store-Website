const DBProvider = require('../utils/dbTransaction');

class Transaction {
    constructor(id, accountID, createDate, amount) {
        this.id = id;
        this.accountID = accountID;
        this.createDate = createDate;
        this.amount = amount;
    }

    static clone(obj) {
        if (!obj || !obj.id) {
            return null;
        }

        return new Transaction(obj.id, obj.accountID, obj.createDate, obj.amount);
    }

    static async getAllTransactions() {
        let data = await DBProvider.getAllTransactions();
        if (data) {
            return data.map(trans => Transaction.clone(trans));
        }

        return null;
    }

    static async getTransactionsByAccountID(accountID) {
        let data = await DBProvider.getTransactionsByAccountID(accountID);
        if (data) {
            return data.map(trans => Transaction.clone(trans));
        }

        return null;
    }

    static async addNewTransaction(accountID, createDate, amount) {
        let data = await DBProvider.addNewTransaction(accountID, createDate, amount);

        if (data) {
            return Transaction.clone(data);
        }

        return null;
    }

    static async addNewTransactionOrder(accountID, orderID, createDate, amount) {
        let data = await DBProvider.addNewTransactionOrder(accountID, orderID, createDate, amount);
        if (data) {
            return Transaction.clone(data);
        }

        return null;
    }
}

module.exports = Transaction;