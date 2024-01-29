const { db } = require('./dbConfig');


function formatDateTime(dataTime) {

    const options = {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    };

    return new Intl.DateTimeFormat('en-US', options).format(dataTime);
}

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

    addNewTransactionOrder: async (accountID, orderID, createDate, amount) => {
        let db_connection = null;
        try {
            db_connection = await db.connect();

            let data = await db_connection.query(`
                INSERT INTO transactions ("accountID", "orderID", "createDate", amount)
                VALUES ($1, $2, $3, $4)
                RETURNING *;
            `,
                [accountID, orderID, createDate, amount]);

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

    getTransactionByOrder: async (orderID) => {
        let db_connection = null;
        try {
            db_connection = await db.connect();

            let data = await db_connection.query(`
                SELECT *
                FROM transactions
                WHERE "orderID" = $1
            `,
                [orderID]);

            if (data && data.length > 0) {
                data = data[0];

                data.createDate = formatDateTime(data.createDate);
                return data;
            }

            return null;
        } catch (error) {
            throw error;
        } finally {
            db_connection.done();
        }
    },

}