const { db } = require('./dbConfig');
const bcrypt = require('bcrypt');

require('dotenv').config();

const SALT_ROUND = parseInt(process.env.SALT_ROUND) || 10;

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

    addNewAccount: async (accountID, pincode) => {
        let db_connection = null;

        try {
            db_connection = await db.connect();

            pincode = await bcrypt.hash(pincode, SALT_ROUND);

            let data = await db_connection.query(`
                INSERT INTO accounts (id, balance, pincode)
                VALUES ($1, $2, $3)
                RETURNING *;
            `,
                [accountID, 500, pincode]);

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

    getAccountByID: async (accID) => {
        let db_connection = null;

        try {
            db_connection = await db.connect();

            let data = await db_connection.query(`
                SELECT * 
                FROM accounts
                WHERE id = $1
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
                console.log("The account's balance is less than the transaction's price !");
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

    handlePaymentFailure: async (accID, transactionPrice) => {
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

            let newBalance = parseInt(accountData.balance) + parseInt(transactionPrice);
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

    getAccountByAPI: async (accountID, pincode) => {
        let db_connection = null;

        try {
            db_connection = await db.connect();

            let data = await db_connection.query(`
                SELECT * 
                FROM accounts
                WHERE id = $1
            `,
                [accountID]);

            if (data && data.length > 0) {
                data = data[0];

                let state = await bcrypt.compare(pincode, data.pincode);
                if (!state) {
                    return null;
                }

                return data;
            }

            return null;
        } catch (error) {
            throw error;
        } finally {
            db_connection.done();
        }
    },

    handlePostPaymentAPI: async (accountID, amount, pincode) => {
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

                let state = await bcrypt.compare(pincode, accountData.pincode);
                if (!state) {
                    return null;
                }
            } else {
                return null;
            }

            let newBalance = parseInt(accountData.balance) - parseInt(transactionPrice);
            if (newBalance < 0) {
                console.log("The account's balance is less than the transaction's price !");
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