const pgp = require('pg-promise')();
const bcrypt = require('bcrypt');
const Permission = require('../models/permission.m');
require('dotenv').config();
const SALT_ROUND = 10;

const connection = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD
}

db = pgp(connection);

module.exports = {
    //USER
    getAllUsers: async () => {
        let db_connection = null;

        try {
            db_connection = await db.connect();
            //select all the users ignoring the admin
            let data = await db_connection.query(`
                SELECT *
                FROM "Users"
                WHERE "permission" != $1
            `,
            Permission.ADMIN);

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

            console.log("Login user");
            console.log(newUser);

            newUser.password = await bcrypt.hash(newUser.password, SALT_ROUND);

            let data = await db_connection.query(`
                INSERT INTO "Users" (username, password, email, "fullName", avatar, phone, address, permission)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                RETURNING *;
            `, 
            [newUser.username, newUser.password, newUser.email, newUser.fullName, 
                newUser.avatar, newUser.phone, newUser.address, newUser.permission]
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
                FROM "Users"
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
                FROM "Users"
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
                FROM "Users"
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
};