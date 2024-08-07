const pgp = require('pg-promise')({
    capSQL: true
});
require('dotenv').config();


const cn = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_PAYMENT_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    max: 30
}

let db = pgp(cn);

module.exports = {
    db,
    pgp
}