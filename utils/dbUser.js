require('dotenv').config();
const db = require('./dbConfig');
const bcrypt = require('bcrypt');
const SALT_ROUND = parseInt(process.env.SALT_ROUND);

module.exports = {
    getAllUsers: async () => {
        let db_connection = null;

        try {
            db_connection = await db.connect();
            //select all the users ignoring the admin
            let data = await db_connection.query(`
                SELECT *
                FROM "users"
            `);

            if(data && data.length > 0) {
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

            if(data && data.length > 0) {
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

            if(data && data.length > 0) {
                data = data[0];
                let state = await bcrypt.compare(password, data.password);
                if(state) {
                    return data;
                } else {
                    return null;
                }
            }

            
            return null;


        } catch (error) {
            throw error;
        } finally {
            db_connection.done();
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

            if(data && data.length > 0) {
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

            if(data && data.length > 0) {
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

    updateGeneralProfile: async (username, fullname, email, phonenumber, address) => {
        let db_connection = null;

        try {
            db_connection = await db.connect();

            let data = await db_connection.query(`
                UPDATE "users"
                SET fullname = $1, email = $2, phonenumber = $3, address = $4
                WHERE username = $5
                RETURNING *;
            `, 
            [fullname, email, phonenumber, address, username]);

            if(data && data.length > 0) {
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
}