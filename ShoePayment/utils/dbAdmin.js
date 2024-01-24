const { db } = require('./dbConfig');

module.exports = {
    getAdmin: async () => {
        let db_connection = null;

        try {
            db_connection = await db.connect();

            let data = await db_connection.query(`
                SELECT * 
                FROM admin
            `);

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

    handleGetPayment: async (transactionPrice) => {
        let db_connection = null;

        try {
            db_connection = await db.connect();

            let adminData = await db_connection.query(`
                SELECT *
                FROM admin
            `);

            if (adminData && adminData.length > 0) {
                adminData = adminData[0];
            } else {
                return null;
            }


            let newBalance = parseInt(transactionPrice) + parseInt(adminData.balance);

            let updatedAdmin = await db_connection.query(`
                UPDATE admin
                SET balance = $1
                RETURNING *;
            `,
                [newBalance]);


            if (updatedAdmin && updatedAdmin.length > 0) {
                return updatedAdmin[0];
            }

            return null;
        } catch (error) {
            throw error;
        } finally {
            db_connection.done();
        }
    }
}