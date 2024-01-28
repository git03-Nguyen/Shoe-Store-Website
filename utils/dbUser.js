require('dotenv').config();
const { db, pgp } = require('./dbConfig');
const bcrypt = require('bcrypt');
const SALT_ROUND = parseInt(process.env.SALT_ROUND);

module.exports = {
    getAllUsers: async () => {
        let db_connection = null;

        try {
            db_connection = await db.connect();
            let data = await db_connection.query(`
                SELECT *
                FROM "users"
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

    addNewUser: async (newUser) => {
        let db_connection = null;

        try {
            db_connection = await db.connect();

            newUser.password = await bcrypt.hash(newUser.password, SALT_ROUND);

            let data = await db_connection.query(`
                INSERT INTO "users" (username, password, email, fullname, avatar, phonenumber, address)
                VALUES ($1, $2, $3, $4, $5, $6, $7)
                RETURNING *;
            `,
                [newUser.username, newUser.password, newUser.email, newUser.fullname,
                newUser.avatar, newUser.phonenumber, newUser.address]
            );

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

    getUserByLogin: async (username, password) => {
        let db_connection = null;

        try {
            db_connection = await db.connect();

            let data = await db_connection.query(`
                SELECT *
                FROM "users"
                WHERE username = $1
            `,
                [username]);

            if (data && data.length > 0) {
                data = data[0];
                let state = await bcrypt.compare(password, data.password);
                if (state) {
                    return data;
                } else {
                    return null;
                }
            }


            return null;


        } catch (error) {
            throw error;
        } finally {
            if (db_connection) {
                db_connection.done();
            }
        }
    },

    getUserById: async (userID) => {
        let db_connection = null;

        try {
            db_connection = await db.connect();

            let data = await db_connection.query(`
                SELECT *
                FROM "users"
                WHERE id = $1
            `,
                [userID]);

            if (data && data.length > 0) {
                data = data[0];
                return data;
            }


            return null;
        } catch (error) {
            throw error;
        } finally {
            db_connection.done();
        }
    },

    getUserByUsername: async (username) => {
        let db_connection = null;

        try {
            db_connection = await db.connect();

            let data = await db_connection.query(`
                SELECT *
                FROM "users"
                WHERE username = $1
            `,
                [username]);

            if (data && data.length > 0) {
                data = data[0];
                return data;
            }

            return null;
        } catch (error) {
            throw error;
        } finally {
            db_connection.done();
        }
    },

    updateGeneralProfile: async (username, fullname, email, phonenumber, address, avatar) => {
        let db_connection = null;

        try {
            db_connection = await db.connect();

            let data = await db_connection.query(`
                UPDATE "users"
                SET fullname = $1, email = $2, phonenumber = $3, address = $4, avatar = $5
                WHERE username = $6
                RETURNING *;
            `,
                [fullname, email, phonenumber, address, avatar, username]);

            if (data && data.length > 0) {
                data = data[0];
                return data;
            }

            return null;
        } catch (error) {
            throw error;
        } finally {
            db_connection.done();
        }
    },

    updatePasswordProfile: async (userID, curPassword, newPassword) => {
        let db_connection = null;

        try {
            db_connection = await db.connect();

            let checkedData = await db_connection.query(`
                SELECT *
                FROM "users"
                WHERE id = $1
            `,
                [userID]);

            if (!checkedData || checkedData.length <= 0) {
                return null;
            }

            checkedData = checkedData[0];
            let state = await bcrypt.compare(curPassword, checkedData.password);
            if (!state) {
                console.log(`Incorrect password !`);
                return null;
            }

            console.log(`Correct password !`);
            console.log(`Update password from ${curPassword} to ${newPassword}`);

            newPassword = await bcrypt.hash(newPassword, SALT_ROUND);

            let data = await db_connection.query(`
                UPDATE "users"
                SET password = $1
                WHERE id = $2
                RETURNING *;
            `,
                [newPassword, userID]);

            if (data && data.length > 0) {
                data = data[0];
                return data;
            }

            return null;
        } catch (error) {
            throw error;
        } finally {
            db_connection.done();
        }
    },

    deleteUser: async (userID) => {
        let db_connection = null;

        try {
            db_connection = await db.connect();

            let data = await db_connection.query(`
                DELETE FROM "users"
                WHERE id = $1
                RETURNING *;
            `,
                [userID]);

            if (data && data.length > 0) {
                data = data[0];
                return data;
            }

            return null;
        } catch (error) {
            throw error;
        } finally {
            db_connection.done();
        }
    },

    editUser: async (id, username, fullname, email, phonenumber, avatar, address, isadmin) => {
        let db_connection = null;

        try {
            db_connection = await db.connect();

            let data = await db_connection.query(`
                UPDATE "users"
                SET username = $1, fullname = $2, email = $3, phonenumber = $4, avatar = $5, address = $6, isadmin = $7
                WHERE id = $8
                RETURNING *;
            `,
                [username, fullname, email, phonenumber, avatar, address, isadmin, id]);

            if (data && data.length > 0) {
                data = data[0];
                return data;
            }

            return null;
        } catch (error) {
            throw error;
        } finally {
            db_connection.done();
        }
    },

    updateAvatar: async (userID, avatar) => {
        let db_connection = null;
        console.log(userID);

        try {
            db_connection = await db.connect();

            let data = await db_connection.query(`
                UPDATE "users"
                SET avatar = $1
                WHERE id = $2
                RETURNING *;
            `,
                [avatar, userID]);

            if (data && data.length > 0) {
                data = data[0];
                return data;
            }

            return null;
        } catch (error) {
            throw error;
        } finally {
            db_connection.done();
        }
    }
}