require('dotenv').config();
const { db, pgp } = require('./dbConfig');

module.exports = {
    addProduct: async function (product) {
        const query = `
            INSERT INTO products (
                categoryId,
                productName,
                productBrand,
                productSizes,
                productColors,
                productPrice,
                productPriceBeforeDiscount,
                productDescription,
                productAdditionalInformation,
                productImage,
                productThumbImages,
                productBigImages,
                productVideoThumbImage,
                productVideoBigImage,
                productVideo,
                productGender,
                shippingCharge,
                productAvailability,
                postingDate,
                updateDate)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, 
                    $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, 
                    $20)
            ON CONFLICT (productName) DO NOTHING
            RETURNING id;
        `;

        const values = [
            product.categoryId,
            product.productName,
            product.productBrand,
            product.productSizes,
            product.productColors,
            product.productPrice,
            product.productPriceBeforeDiscount,
            product.productDescription,
            product.productAdditionalInformation,
            product.productImage,
            product.productThumbImages,
            product.productBigImages,
            product.productVideoThumbImage,
            product.productVideoBigImage,
            product.productVideo,
            product.productGender,
            product.shippingCharge,
            product.productAvailability,
            product.postingDate,
            product.updateDate,
        ];

        let res = -1;
        try {
            res = await db.one(query, values);
        }
        catch (error) {
            if (error instanceof pgp.errors.QueryResultError && error.code === pgp.errors.queryResultErrorCode.noData) {
                // Handle the case when no data is found
                console.log('No row is inserted.');
            }
            else {
                console.error(error);
            }
        }

        return res;
    },

    updateProduct: async function (product) {
        const query = `
        UPDATE products
        SET categoryId = $1,
            productName = $2,
            productBrand = $3,
            productSizes = $4,
            productColors = $5,
            productPrice = $6,
            productPriceBeforeDiscount = $7,
            productDescription = $8,
            productAdditionalInformation = $9,
            productImage = $10,
            productThumbImages = $11,
            productBigImages = $12,
            productVideoThumbImage = $13,
            productVideoBigImage = $14,
            productVideo = $15,
            productGender = $16,
            shippingCharge = $17,
            productAvailability = $18,
            postingDate = $19,
            updateDate = $20
        WHERE id = $21;
    `;

        const values = [
            product.categoryId,
            product.productName,
            product.productBrand,
            product.productSizes,
            product.productColors,
            product.productPrice,
            product.productPriceBeforeDiscount,
            product.productDescription,
            product.productAdditionalInformation,
            product.productImage,
            product.productThumbImages,
            product.productBigImages,
            product.productVideoThumbImage,
            product.productVideoBigImage,
            product.productVideo,
            product.productGender,
            product.shippingCharge,
            product.productAvailability,
            product.postingDate,
            product.updateDate,
            product.id,
        ];

        let flag = true;
        try {
            await db.none(query, values);
        }
        catch (error) {
            flag = false;
            console.error(error);
        }

        return flag;
    },

    deleteProduct: async function (id) {
        const query = `
            DELETE FROM products WHERE id = $1;
        `;

        const values = [id];

        let flag = true;
        try {
            await db.none(query, values);
        }
        catch (error) {
            flag = false;
            console.error(error);
        }

        return flag;
    },

    getAllProducts: async function () {
        const query = `
            SELECT * FROM products;
        `;
        let res = [];
        try {
            res = await db.any(query);
        }
        catch (error) {
            console.error(error);
        }

        return res;
    },

    getAllProductsAtPage: async function (page, pageSize) {
        const query = `
            SELECT * FROM products
            OFFSET $1 LIMIT $2;
        `;
        let res = [];
        try {
            res = await db.any(query, [(page - 1) * pageSize, pageSize]);
        }
        catch (error) {
            if (error instanceof pgp.errors.QueryResultError && error.code === pgp.errors.queryResultErrorCode.noData) {
                // Handle the case when no data is found
                console.log('No data found.');
            }
            else {
                console.error(error);
            }
        }

        return res;
    },

    // return: the number of products and the number of pages
    getNumberOfProductsAndPages: async function (pageSize) {
        const query = `
            SELECT COUNT(*) as count FROM products;
        `
        let res = null;
        let flag = true;
        try {
            res = await db.one(query);
        }
        catch (error) {
            if (error instanceof pgp.errors.QueryResultError && error.code === pgp.errors.queryResultErrorCode.noData) {
                // Handle the case when no data is found
                console.log('No data found.');
            }
            else {
                console.error(error);
            }
            flag = false;
        }

        if (res == null) {
            return [0, 1];
        }

        let pagesNumber = 1;
        if (flag) {
            pagesNumber = Math.floor((res.count - 1) / (pageSize)) + 1;
        }

        return [res.count, pagesNumber];
    },

    getProductById: async function (id) {
        const query = `
            SELECT * FROM products WHERE id = $1;
        `;

        let res = null;
        const values = [id];

        try {
            res = await db.one(query, values);
        }
        catch (error) {
            if (error instanceof pgp.errors.QueryResultError && error.code === pgp.errors.queryResultErrorCode.noData) {
                // Handle the case when no data is found
                console.log('No data found.');
            }
            else {
                console.error(error);
            }
        }

        return res;
    },

    filterProductsAtPage: async function (keyword, category, brand, gender, startPrice, endPrice, order, page, pageSize) {
        let query = '';
        if (order === null || order === undefined) {
            query = `
                SELECT * FROM products AS p join categories AS c ON p.categoryId = c.id
                WHERE ($1 IS NULL OR $1 = '' OR $1 = 'ALL' OR productName ILIKE $2) 
                AND ($3 IS NULL OR $3 = '' OR $3 = 'ALL' OR c.categoryName = $3)
                AND ($4 IS NULL OR $4 = '' OR $4 = 'ALL' OR p.productBrand = $4)
                AND ($5 IS NULL OR $5 = '' OR $5 = 'ALL' OR p.productGender = $5)
                AND ($6 < 0 OR $7 < 0 OR (p.productPrice::numeric >= $6 AND p.productPrice::numeric <= $7))
                OFFSET $8 LIMIT $9;
            `;
        }
        else if (order.toLowerCase() === 'asc') {
            query = `
                SELECT * FROM products AS p join categories AS c ON p.categoryId = c.id
                WHERE ($1 IS NULL OR $1 = '' OR $1 = 'ALL' OR productName ILIKE $2) 
                AND ($3 IS NULL OR $3 = '' OR $3 = 'ALL' OR c.categoryName = $3)
                AND ($4 IS NULL OR $4 = '' OR $4 = 'ALL' OR p.productBrand = $4)
                AND ($5 IS NULL OR $5 = '' OR $5 = 'ALL' OR p.productGender = $5)
                AND ($6 < 0 OR $7 < 0 OR (p.productPrice::numeric >= $6 AND p.productPrice::numeric <= $7))
                ORDER BY p.productPrice::numeric ASC
                OFFSET $8 LIMIT $9;
            `;
        }
        else if (order.toLowerCase() === 'desc') {
            query = `
                SELECT * FROM products AS p join categories AS c ON p.categoryId = c.id 
                WHERE ($1 IS NULL OR $1 = '' OR $1 = 'ALL' OR productName ILIKE $2) 
                AND ($3 IS NULL OR $3 = '' OR $3 = 'ALL' OR c.categoryName = $3)
                AND ($4 IS NULL OR $4 = '' OR $4 = 'ALL' OR p.productBrand = $4)
                AND ($5 IS NULL OR $5 = '' OR $5 = 'ALL' OR p.productGender = $5)
                AND ($6 < 0 OR $7 < 0 OR (p.productPrice::numeric >= $6 AND p.productPrice::numeric <= $7))
                ORDER BY p.productPrice::numeric DESC 
                OFFSET $8 LIMIT $9;
            `;
        }

        const values = [
            keyword,
            `%${keyword}%`,
            category,
            brand,
            gender,
            startPrice,
            endPrice,
            (page - 1) * pageSize,
            pageSize
        ];

        let res = [];
        try {
            res = await db.any(query, values);
        }
        catch (error) {
            if (error instanceof pgp.errors.QueryResultError && error.code === pgp.errors.queryResultErrorCode.noData) {
                // Handle the case when no data is found
                console.log('No data found.');
            }
            else {
                console.error(error);
            }
        }

        return res;
    },

    filterNumberProductsAndPages: async function (keyword, category, brand, gender, startPrice, endPrice, pageSize) {
        let query = `
                SELECT COUNT(*) AS count FROM products AS p join categories AS c ON p.categoryId = c.id
                WHERE ($1 IS NULL OR $1 = '' OR $1 = 'ALL' OR productName ILIKE $2) 
                AND ($3 IS NULL OR $3 = '' OR $3 = 'ALL' OR c.categoryName = $3)
                AND ($4 IS NULL OR $4 = '' OR $4 = 'ALL' OR p.productBrand = $4)
                AND ($5 IS NULL OR $5 = '' OR $5 = 'ALL' OR p.productGender = $5)
                AND ($6 < 0 OR $7 < 0 OR (p.productPrice::numeric >= $6 AND p.productPrice::numeric <= $7));
           `;

        let res = null;
        const values = [
            keyword,
            `%${keyword}%`,
            category,
            brand,
            gender,
            startPrice,
            endPrice
        ];
        let flag = true;
        try {
            res = await db.one(query, values);
        }
        catch (error) {
            if (error instanceof pgp.errors.QueryResultError && error.code === pgp.errors.queryResultErrorCode.noData) {
                // Handle the case when no data is found
                console.log('No data found.');
            }
            else {
                console.error(error);
            }
            flag = false;
        }


        if (res == null) {
            return [0, 1];
        }

        let pagesNumber = 1;
        if (flag) {
            pagesNumber = parseInt((res.count - 1) / (pageSize)) + 1;
        }

        return [res.count, pagesNumber];
    },

    getRelativeProductsByCategoryId: async function (categoryId) {
        const query = `SELECT * FROM products WHERE categoryId = $1`;
        const values = [categoryId];
        let res = [];
        try {
            res = await db.any(query, values);
        } catch (error) {
            console.error(error);
        }

        return res;
    },

    getAllBrands: async function () {
        const query = ` SELECT DISTINCT productBrand FROM products GROUP BY productBrand;`;

        let res = [];
        try {
            res = await db.any(query);
        } catch (error) {
            if (error instanceof pgp.errors.QueryResultError && error.code === pgp.errors.queryResultErrorCode.noData) {
                // Handle the case when no data is found
                console.log('No data found.');
            }
            else {
                console.error(error);
            }
        }

        return res;
    },

    getAllGenders: async function () {
        const query = ` SELECT DISTINCT productGender FROM products GROUP BY productGender;`;

        let res = [];
        try {
            res = await db.any(query);
        } catch (error) {
            if (error instanceof pgp.errors.QueryResultError && error.code === pgp.errors.queryResultErrorCode.noData) {
                // Handle the case when no data is found
                console.log('No data found.');
            }
            else {
                console.error(error);
            }
        }

        return res;
    },

    getTopBestSellerProducts: async () => {
        try {
            let sql = `SELECT * FROM products where productprice::numeric>=50 and productprice::numeric<=100 order by productprice::numeric desc limit 8`;
            let result = await db.any(sql);
            return result;
        }
        catch (error) {
            if (error instanceof pgp.errors.QueryResultError && error.code === pgp.errors.queryResultErrorCode.noData) {
                // Handle the case when no data is found
                console.log('No data found.');
            }
            else {
                console.error(error);
            }
            return [];
        }
    },

    getTopNewArrivalProducts: async () => {
        try {
            let sql = `SELECT * FROM products order by postingdate desc limit 8`;
            let result = await db.any(sql);
            return result;
        }
        catch (error) {
            if (error instanceof pgp.errors.QueryResultError && error.code === pgp.errors.queryResultErrorCode.noData) {
                // Handle the case when no data is found
                console.log('No data found.');
            }
            else {
                console.error(error);
            }
            return [];
        }
    },

    getTopHotSalesProducts: async () => {
        try {
            let sql = `SELECT * FROM products where productprice::numeric<=80 order by productprice desc limit 4`;
            let result = await db.any(sql);
            return result;
        }
        catch (error) {
            if (error instanceof pgp.errors.QueryResultError && error.code === pgp.errors.queryResultErrorCode.noData) {
                // Handle the case when no data is found
                console.log('No data found.');
            }
            else {
                console.error(error);
            }
            return [];
        }
    },

    countProducts: async () => {
        try {
            let sql = `SELECT COUNT(*) FROM products`;
            let result = await db.one(sql);
            return result.count;
        }
        catch (error) {
            console.error(error);
            return 0;
        }
    },
}