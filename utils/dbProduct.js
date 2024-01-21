require('dotenv').config();
const db = require('./dbConfig');

module.exports = {
    getAllProductsAtPage: async function (page, pageSize){
        const query = `
            SELECT * FROM products
            OFFSET $1 LIMIT $2;
        `;
        let res = null;
        try{
            res = await db.pool.query(query, [(page - 1)* pageSize, pageSize]);
        }
        catch(error){
            console.error(error);
        }

        return res.rows;
    },

    // return: the number of products and the number of pages
    getNumberOfProductsAndPages: async function(pageSize){
        const query = `
            SELECT COUNT(*) FROM products;
        `
        let res = 0;
        let flag = true;
        try{
            res = await db.pool.query(query);
        }
        catch(error)
        {
            console.error(error);
            flag = false;
        }

        let pagesNumber = 1;
        if(flag){
           pagesNumber  = Math.floor((res.rows[0].count-1) / (pageSize)) + 1;
        }

        return [res.rows[0].count, pagesNumber];
    },

    getProductById: async function(id) {
        const query = `
            SELECT * FROM products WHERE id = $1;
        `;

        let res = null;
        const values = [id];

        try{
            res = await db.pool.query(query, values); 
        }
        catch(error){
            console.error(error);
        }

        return res.rows;
    },

    filterProducts: async function(keyword, category, brand, startPrice, endPrice, order){
        let query = '';
        if(order.toLowerCase() === 'asc'){
            query = `
                SELECT * FROM products AS p join categories AS c ON p.categoryId = c.id
                WHERE ($1 IS NULL OR $1 = '' OR $1 = 'ALL' OR productName ILIKE $1) 
                AND ($2 IS NULL OR $2 = '' OR $2 = 'ALL' OR c.categoryName = $2)
                AND ($3 IS NULL OR $3 = '' OR $3 = 'ALL' OR p.productBranch = $3)
                AND ($4 < 0 OR $5 < 0 OR (p.price >= $4 AND p.price <= $5))
                ORDER BY p.productPrice ASC;
            `;
        }
        
        if(order.toLowerCase() === 'desc'){
            query = `
                SELECT * FROM products AS p join categories AS c ON p.categoryId = c.id
                WHERE ($1 IS NULL OR $1 = '' OR $1 = 'ALL' OR productName ILIKE $1) 
                AND ($2 IS NULL OR $2 = '' OR $2 = 'ALL' OR c.categoryName = $2)
                AND ($3 IS NULL OR $3 = '' OR $3 = 'ALL' OR p.productBranch = $3)
                AND ($4 < 0 OR $5 < 0 OR (p.price >= $4 AND p.price <= $5))
                ORDER BY p.productPrice DESC;
            `;
        }

        const values = [
            keyword, 
            category, 
            brand, 
            startPrice, 
            endPrice
        ];
        
        let res = null;
        try{
            res = await db.pool.query(query, values);
        }
        catch(error){
            console.error(error);
        }

        return res.rows;
    },

    filterProductsAtPage: async function(keyword, category, brand, startPrice, endPrice, order, page, pageSize){
        let query = '';
        if(order.toLowerCase() === 'asc'){
            query = `
                SELECT * FROM products AS p join categories AS c ON p.categoryId = c.id
                WHERE ($1 IS NULL OR $1 = '' OR $1 = 'ALL' OR productName ILIKE $1) 
                AND ($2 IS NULL OR $2 = '' OR $2 = 'ALL' OR c.categoryName = $2)
                AND ($3 IS NULL OR $3 = '' OR $3 = 'ALL' OR p.productBranch = $3)
                AND ($4 < 0 OR $5 < 0 OR (p.price >= $4 AND p.price <= $5))
                ORDER BY p.productPrice ASC
                OFFSET $6 LIMIT $7;
            `;
        }
        
        if(order.toLowerCase() === 'desc'){
            query = `
                SELECT * FROM products AS p join categories AS c ON p.categoryId = c.id
                WHERE ($1 IS NULL OR $1 = '' OR $1 = 'ALL' OR productName ILIKE $1) 
                AND ($2 IS NULL OR $2 = '' OR $2 = 'ALL' OR c.categoryName = $2)
                AND ($3 IS NULL OR $3 = '' OR $3 = 'ALL' OR p.productBranch = $3)
                AND ($4 < 0 OR $5 < 0 OR (p.price >= $4 AND p.price <= $5))
                ORDER BY p.productPrice DESC
                OFFSET $6 LIMIT $7;
            `;
        }

        const values = [
            keyword, 
            category, 
            brand, 
            startPrice, 
            endPrice,
            (page-1)*pageSize,
            pageSize
        ];
        
        let res = null;
        try{
            res = await db.pool.query(query, values);
        }
        catch(error){
            console.error(error);
        }

        return res.rows;
    },

    filterNumberProductsAndPages: async function(keyword, category, brand, startPrice, endPrice, order, pageSize){
        let query = '';
        if(order.toLowerCase() === 'asc'){
            query = `
                SELECT * FROM products AS p join categories AS c ON p.categoryId = c.id
                WHERE ($1 IS NULL OR $1 = '' OR $1 = 'ALL' OR productName ILIKE $1) 
                AND ($2 IS NULL OR $2 = '' OR $2 = 'ALL' OR c.categoryName = $2)
                AND ($3 IS NULL OR $3 = '' OR $3 = 'ALL' OR p.productBranch = $3)
                AND ($4 < 0 OR $5 < 0 OR (p.price >= $4 AND p.price <= $5))
                ORDER BY p.productPrice ASC;
            `;
        }
        
        if(order.toLowerCase() === 'desc'){
            query = `
                SELECT * FROM products AS p join categories AS c ON p.categoryId = c.id
                WHERE ($1 IS NULL OR $1 = '' OR $1 = 'ALL' OR productName ILIKE $1) 
                AND ($2 IS NULL OR $2 = '' OR $2 = 'ALL' OR c.categoryName = $2)
                AND ($3 IS NULL OR $3 = '' OR $3 = 'ALL' OR p.productBranch = $3)
                AND ($4 < 0 OR $5 < 0 OR (p.price >= $4 AND p.price <= $5))
                ORDER BY p.productPrice DESC;
            `;
        }

        let res = 0;
        const values = [
            keyword, 
            category, 
            brand, 
            startPrice, 
            endPrice
        ];
        let flag = true;
        try{
            res = await db.pool.query(query);
        }
        catch(error)
        {
            console.error(error);
            flag = false;
        }

        let pagesNumber = 1;
        if(flag){
        pagesNumber  = parseInt((res.rows[0].count-1) / (pageSize)) + 1;
        }

        return [res.rows[0].count, pagesNumber];
    }
}