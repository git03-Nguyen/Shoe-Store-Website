require('dotenv').config();
const db = require('./dbConfig');

module.exports = {
    getAllProductsAtPage: async function (page, pageSize){
        const query = `
            SELECT * FROM products
            OFFSET $1 LIMIT $2;
        `;
        let res = [];
        try{
            res = await db.any(query, [(page - 1)* pageSize, pageSize]);
        }
        catch(error){
            console.error(error);
        }

        return res;
    },

    // return: the number of products and the number of pages
    getNumberOfProductsAndPages: async function(pageSize){
        const query = `
            SELECT COUNT(*) as count FROM products;
        `
        let res = null;
        let flag = true;
        try{
            res = await db.one(query);
        }
        catch(error)
        {
            console.error(error);
            flag = false;
        }

        if(res == null){
            return [0, 1];
        }

        let pagesNumber = 1;
        if(flag){
           pagesNumber  = Math.floor((res.count-1) / (pageSize)) + 1;
        }

        return [res.count, pagesNumber];
    },

    getProductById: async function(id) {
        const query = `
            SELECT * FROM products WHERE id = $1;
        `;

        let res = null;
        const values = [id];

        try{
            res = await db.one(query, values); 
        }
        catch(error){
            console.error(error);
        }

        return res;
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
        
        let res = [];
        try{
            res = await db.any(query, values);
        }
        catch(error){
            console.error(error);
        }

        return res;
    },

    filterNumberProductsAndPages: async function(keyword, category, brand, startPrice, endPrice, order, pageSize){
        let query = '';
        if(order.toLowerCase() === 'asc'){
            query = `
                SELECT COUNT(*) FROM products AS p join categories AS c ON p.categoryId = c.id
                WHERE ($1 IS NULL OR $1 = '' OR $1 = 'ALL' OR productName ILIKE $1) 
                AND ($2 IS NULL OR $2 = '' OR $2 = 'ALL' OR c.categoryName = $2)
                AND ($3 IS NULL OR $3 = '' OR $3 = 'ALL' OR p.productBranch = $3)
                AND ($4 < 0 OR $5 < 0 OR (p.price >= $4 AND p.price <= $5))
                ORDER BY p.productPrice ASC;
            `;
        }
        
        if(order.toLowerCase() === 'desc'){
            query = `
                SELECT COUNT(*) FROM products AS p join categories AS c ON p.categoryId = c.id
                WHERE ($1 IS NULL OR $1 = '' OR $1 = 'ALL' OR productName ILIKE $1) 
                AND ($2 IS NULL OR $2 = '' OR $2 = 'ALL' OR c.categoryName = $2)
                AND ($3 IS NULL OR $3 = '' OR $3 = 'ALL' OR p.productBranch = $3)
                AND ($4 < 0 OR $5 < 0 OR (p.price >= $4 AND p.price <= $5))
                ORDER BY p.productPrice DESC;
            `;
        }

        let res = null;
        const values = [
            keyword, 
            category, 
            brand, 
            startPrice, 
            endPrice
        ];
        let flag = true;
        try{
            res = await db.one(query);
        }
        catch(error)
        {
            console.error(error);
            flag = false;
        }

        
        if(res == null){
            return [0, 1];
        }

        let pagesNumber = 1;
        if(flag){
        pagesNumber  = parseInt((res.count-1) / (pageSize)) + 1;
        }

        return [res.count, pagesNumber];
    },

    getTopBestSellerProducts: async ()=>{
        try{
            let sql=`SELECT * FROM products where productprice::numeric>=50 and productprice::numeric<=100 order by productprice::numeric desc limit 8`;
            let result = await db.any(sql);
            return result;
        }
        catch(err){
            console.log(err);
            return [];
        }
    },

    getTopNewArrivalProducts: async ()=>{
        try{
            let sql=`SELECT * FROM products order by postingdate desc limit 8`;
            let result=await db.any(sql);
            return result;
        }
        catch(err){
            console.log(err);
            return [];
        }
    },
    
    getTopHotSalesProducts: async ()=>{
        try{
            let sql=`SELECT * FROM products where productprice::numeric<=80 order by productprice desc limit 4`;
            let result=await db.any(sql);
            return result;
        } 
        catch(err){
            console.log(err);
            return [];
        }
    }
}