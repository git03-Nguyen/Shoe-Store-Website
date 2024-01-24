const DBProvider = require('../utils/dbAdmin');

class Admin {
    constructor(id, balance) {
        this.id = id;
        this.balance = balance;
    }

    static clone(obj) {
        if (!obj || !obj.id) {
            return null;
        }

        return new Admin(obj.id, obj.balance);
    }

    static async getAdmin() {
        let data = await DBProvider.getAdmin();
        if (data) {
            return Admin.clone(data);
        }

        return null;
    }

    static async handleGetPayment(transactionPrice) {
        let data = await DBProvider.handleGetPayment(transactionPrice);
        if (data) {
            return Admin.clone(data);
        }

        return null;
    }
}

module.exports = Admin;