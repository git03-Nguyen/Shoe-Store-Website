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
    importJSON: async function () {
        // Check database existed ?
        async function CheckDatabaseExit(databaseName) {
            try {
                // Use pg-promise query method to execute a SQL query
                const result = await db.one('SELECT datname FROM pg_database WHERE datname = $1', [databaseName]);

                // If the result is not empty, the database exists
                return result !== null && result !== undefined && result.datname.toLowerCase() === databaseName.toLowerCase();
            } catch (error) {
                return false;
            }
        }

        let checkValue = await CheckDatabaseExit(process.env.DB_NAME);
        if (checkValue == true) {
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
            let sqlScript = await fs.readFile(path.join(__dirname, '../data/script.sql'), { encoding: 'utf-8' });
            await db.multi(sqlScript);
        } catch (error) {
            console.log(error);
            return "Create database failed";
        }

        // Insert into categories
        const categoryDic = new Object();
        for (let index = 0; index < Object.keys(data).length; index++) {
            if (categoryDic[`${data[index].category}`] === null || categoryDic[`${data[index].category}`] === undefined) {
                categoryDic[`${data[index].category}`] = Object.keys(categoryDic).length + 1;
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
        for (let index = 0; index < Object.keys(data).length; index++) {
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
                    ['c-1', 'c-2', 'c-3', 'c-4', 'c-5'],
                    ['https://down-vn.img.susercontent.com/file/e631b1a0f583a1420a38e61d92d3db2f_tn', 'https://down-vn.img.susercontent.com/file/5e0f25437df0e5c7daeff85c2e9019f6_tn', 'https://down-vn.img.susercontent.com/file/65b22d06d48c62c75d65761a1d65a52f_tn'],
                    ['https://down-vn.img.susercontent.com/file/e631b1a0f583a1420a38e61d92d3db2f', 'https://down-vn.img.susercontent.com/file/5e0f25437df0e5c7daeff85c2e9019f6', 'https://down-vn.img.susercontent.com/file/65b22d06d48c62c75d65761a1d65a52f'],
                    'https://down-vn.img.susercontent.com/file/8fac10e7fda31cd74366232a28064bd2_tn',
                    'https://e1.pxfuel.com/desktop-wallpaper/930/288/desktop-wallpaper-full-dark-black-screen-black-screen.jpg',
                    'https://cvf.shopee.vn/file/25c6185ae3e7379b0c6f3e787370039b',
                    `
                    <p class="note">Skechers Men's Max Cushioning Slip-ins-Athletic Workout Running Walking Shoes with Memory Foam Sneaker</p>
                    <div class="product__details__tab__content__item">
                        <h5>Product details</h5>
                        <p><b>Origin: </b>Made in the USA or Imported</p>                        
                        <p><b>Sole material: </b>Rubber</p>                        
                        <p><b>Outer material: </b>Polyester</p>                        
                        <p><b>Closure type: </b>Lace-Up</p>                        
                    </div>
                    `,
                    `
                    <div class="product__details__tab__content__item">
                        <h5>About this item</h5>
                        <ul>
                            <li>SKECHERS SLIP-INS (HANDS-FREE): keep up the pace in enhanced comfort and stability with the Skechers Max Cushioning Premier sneakers (tennis shoes); slip inside these trainers and go
                            <li>SKECHERS MAX CUSHIONING MEN: these sneakers are designed for exceptional comfort and support; featuring an adjustable lace-up front (top of shoe) with an exclusive heel pillow that holds your foot securely in place
                            <li>SKECHERS AIR-COOLED MEMORY FOAM: provides pressure relief, instant comfort, and breathability; the cushion contours to most foot shapes; helps wick moisture (sweat) away; gel-infused, high-rebound memory foam
                            <li>ATHLETIC ACTIVITIES: running, hiking, jogging, walking, treadmill, workouts, training, gym, lifting, multi-sport exercise; these can be worn year-round (winter, summer, fall, spring); machine washable - easy to clean
                            <li>MULTI-PURPOSE: add performance comfort to casual occasions; wear indoor, around the house, to and from work, for travel, or even while driving; the possibilities continue
                        </ul>
                    </div>
                    `
                ];

                await db.none(`INSERT INTO products(productName, productBrand, productGender, categoryId,
                    productPrice, productAvailability, productImage, productSlug, productSizes, productColors,
                    productThumbImages, productBigImages, productVideoThumbImage, productVideoBigImage, productVideo,
                    productDescription, productAdditionalInformation)
                    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
                    ON CONFLICT (productName) DO NOTHING;`, values);
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