const { db } = require('./dbConfig');

module.exports = {
    getAllTransactions: async () => {
        let db_connection = null;
        try {
            db_connection = await db.connect();

            let data = await db_connection.query(`
                SELECT *
                FROM transactions
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

    getTransactionsByAccountID: async (accountID) => {
        let db_connection = null;
        try {
            db_connection = await db.connect();

            let data = await db_connection.query(`
                SELECT *
                FROM transactions
                WHERE "accountID" = $1
            `,
                [accountID]);

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

    addNewTransaction: async (accountID, createDate, amount) => {
        let db_connection = null;
        try {
            db_connection = await db.connect();

            let data = await db_connection.query(`
                INSERT INTO transactions ("accountID", "createDate", amount)
                VALUES ($1, $2, $3)
                RETURNING *;
            `,
                [accountID, createDate, amount]);

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

}