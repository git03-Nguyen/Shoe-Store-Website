require('dotenv').config()
const path = require('path');
const pgp = require('pg-promise')();
const fs = require('fs/promises');

// create connection string
const cn = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    max: 30,
}

// create database object
const db = pgp(cn);
const data = require('../data/data001.json');
const { isNull } = require('util');

module.exports = {
    importJSON: async function (){
        // Check database existed ?
        async function CheckDatabaseExit(databaseName){
            try {
                // Use pg-promise query method to execute a SQL query
                const result =  await db.one('SELECT datname FROM pg_database WHERE datname = $1',[databaseName]);

                // If the result is not empty, the database exists
                return result !== null && result !== undefined && result.datname.toLowerCase() === databaseName.toLowerCase();
            } catch (error) {
                return false;
            }
        }

        let checkValue = await CheckDatabaseExit(process.env.DB_NAME);
        if(checkValue ==  true) {
            console.log("Database was created");
            return "Database was created";
        }

        console.log("Database is creating...");

        // create database from script
        try {
            // Create database;
            await pgp({
                host: process.env.DB_HOST,
                port: process.env.DB_PORT,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                max: 30,
            }).none(`CREATE DATABASE "ShoeStoreDB"
                        WITH
                        OWNER = postgres
                        ENCODING = 'UTF8'
                        LOCALE_PROVIDER = 'libc'
                        CONNECTION LIMIT = -1
                        IS_TEMPLATE = False;
                        
                        `);

            // Create tables and add constraints.
            let sqlScript = await fs.readFile(path.join(__dirname, '../data/script.sql'), {encoding: 'utf-8'});
            await db.multi(sqlScript);
        } catch (error) {
            console.log(error);
            return "Create database failed";
        }

        // Insert into categories
        const categoryDic = new Object(); 
        for(let index = 0; index < Object.keys(data).length; index++){
            if(categoryDic[`${data[index].category}`] === null || categoryDic[`${data[index].category}`] === undefined){
                categoryDic[`${data[index].category}`] =  Object.keys(categoryDic).length + 1;
                try {
                    const values = [data[index].category, new Date()];
                    await db.none(`
                        INSERT INTO categories(categoryName, creationDate)
                        VALUES($1, $2)
                        ON CONFLICT (categoryName) DO NOTHING;`, values);
                } catch (error) {
                    console.log(error);
                }
            }
        }

        /*
        "id":1,
        "name":"Nike React Infinity Run Flyknit",
        "brand":"NIKE",
        "gender":"MEN",
        "category":"RUNNING",
        "price":160,
        "is_in_inventory":true,
        "items_left":3,
        "imageURL":"https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/i1-665455a5-45de-40fb-945f-c1852b82400d/react-infinity-run-flyknit-mens-running-shoe-zX42Nc.jpg",
        "slug":"nike-react-infinity-run-flyknit"
        */

        // Insert into products
        for(let index = 0; index < Object.keys(data).length; index++){
            try {
                var categoryId = await db.one(`SELECT id FROM categories where categoryName = $1`, [data[index].category]);
                const values = [
                    data[index].name,
                    data[index].brand,
                    data[index].gender,
                    categoryId.id,
                    data[index].price,
                    data[index].items_left,
                    data[index].imageURL,
                    data[index].slug,
                    [39, 41, 42, 44],
                    ['c-1', 'c-2', 'c-4', 'c-6', 'c-9'],
                    ['https://down-vn.img.susercontent.com/file/e631b1a0f583a1420a38e61d92d3db2f_tn', 'https://down-vn.img.susercontent.com/file/5e0f25437df0e5c7daeff85c2e9019f6_tn', 'https://down-vn.img.susercontent.com/file/65b22d06d48c62c75d65761a1d65a52f_tn'],
                    ['https://down-vn.img.susercontent.com/file/e631b1a0f583a1420a38e61d92d3db2f', 'https://down-vn.img.susercontent.com/file/5e0f25437df0e5c7daeff85c2e9019f6', 'https://down-vn.img.susercontent.com/file/65b22d06d48c62c75d65761a1d65a52f'],
                    'https://down-vn.img.susercontent.com/file/8fac10e7fda31cd74366232a28064bd2_tn',
                    'https://media.istockphoto.com/id/1212476803/video/play-icon-like-on-player.jpg?s=640x640&k=20&c=tKj6ZBiZ2oHSUi6sD5vasSOKt2T-ltLmy1ARwY6km5o=',
                    'https://cvf.shopee.vn/file/25c6185ae3e7379b0c6f3e787370039b'
                ];

                await db.none(`INSERT INTO products(productName, productBrand, productGender, categoryId,
                    productPrice, productAvailability, productImage, productSlug, productSizes, productColors,
                    productThumbImages, productBigImages, productVideoThumbImage, productVideoBigImage, productVideo)
                    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
                    ON CONFLICT (productName) DO NOTHING;`,values);
            } catch (error) {
                console.log(error);
            }
        }   
        
        // Update posting date, random date
        try {
            await db.none(`UPDATE public.products
                SET postingdate = '2023-01-01'::DATE + (random() * interval '365 days')
                WHERE postingdate IS NULL;`);
        } catch (error) {
            console.log(error);
        }
        
        console.log("Database has already created");
        return "Database has already created";
    }
}