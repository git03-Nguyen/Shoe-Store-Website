const { db } = require('./dbConfig');

module.exports = {
    getAllAccounts: async () => {
        let db_connection = null;

        try {
            db_connection = await db.connect();

            let data = await db_connection.query(`
                SELECT * 
                FROM accounts
                ORDER BY id
            `);

            if (data && data.length > 0) {
                return data;
            }

            return null;
        } catch (error) {
            throw error;
        } finally {
            db_connection.done();
        }
    },

    getAccountByID: async (accID) => {
        let db_connection = null;

        try {
            db_connection = await db.connect();

            let data = await db_connection.query(`
                SELECT * 
                FROM accounts
                WHEERE id = $1
            `,
                [accID]);

            if (data && data.length > 0) {
                return data[0];
            }

            return null;
        } catch (error) {
            throw error;
        } finally {
            db_connection.done();
        }
    },

    handlePostPayment: async (accID, transactionPrice) => {
        let db_connection = null;

        try {
            db_connection = await db.connect();

            let accountData = await db_connection.query(`
                SELECT *
                FROM accounts
                WHERE id = $1
            `,
                [accID]);

            if (accountData && accountData.length > 0) {
                accountData = accountData[0];
            } else {
                return null;
            }

            let newBalance = parseInt(accountData.balance) - parseInt(transactionPrice);
            if (newBalance < 0) {
                console.log("The account's balance is lss than the transaction's price !");
                return null;
            }

            let updatedAccount = await db_connection.query(`
                UPDATE accounts
                SET balance = $1
                WHERE id = $2
                RETURNING *;
            `,
                [newBalance, accID]);



            if (updatedAccount && updatedAccount.length > 0) {
                return updatedAccount[0];

            }

            return null;
        } catch (error) {
            throw error;
        } finally {
            db_connection.done();
        }
    },

}