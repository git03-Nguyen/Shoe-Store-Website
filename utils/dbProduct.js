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

    filterProductsAtPage: async function(keyword, category, brand, gender, startPrice, endPrice, order, page, pageSize){
        let query = '';
        if(order === null || order === undefined){
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
        else if(order.toLowerCase() === 'asc'){
            query = `
                SELECT * FROM products AS p join categories AS c ON p.categoryId = c.id
                WHERE ($1 IS NULL OR $1 = '' OR $1 = 'ALL' OR productName ILIKE $2) 
                AND ($3 IS NULL OR $3 = '' OR $3 = 'ALL' OR c.categoryName = $3)
                AND ($4 IS NULL OR $4 = '' OR $4 = 'ALL' OR p.productBrand = $4)
                AND ($5 IS NULL OR $5 = '' OR $5 = 'ALL' OR p.productGender = $5)
                AND ($6 < 0 OR $7 < 0 OR (p.productPrice::numeric >= $6 AND p.productPrice::numeric <= $7))
                ORDER BY p.productPrice ASC
                OFFSET $8 LIMIT $9;
            `;
        }
        else if(order.toLowerCase() === 'desc'){
            query = `
                SELECT * FROM products AS p join categories AS c ON p.categoryId = c.id 
                WHERE ($1 IS NULL OR $1 = '' OR $1 = 'ALL' OR productName ILIKE $2) 
                AND ($3 IS NULL OR $3 = '' OR $3 = 'ALL' OR c.categoryName = $3)
                AND ($4 IS NULL OR $4 = '' OR $4 = 'ALL' OR p.productBrand = $4)
                AND ($5 IS NULL OR $5 = '' OR $5 = 'ALL' OR p.productGender = $5)
                AND ($6 < 0 OR $7 < 0 OR (p.productPrice::numeric >= $6 AND p.productPrice::numeric <= $7))
                ORDER BY p.productPrice DESC
                OFFSET $8 LIMIT $9;
            `;
        }

        console.log("keyword: " + keyword);
        console.log("category: " + category);
        console.log("brand: " + brand);
        console.log("gender: " + gender);
        console.log("startPrice: " + startPrice);
        console.log("endPrice: " + endPrice);
        console.log("page: " + page);
        console.log("pageSize: " + pageSize);
        console.log("order: " + order);
        console.log(query);

        const values = [
            keyword,
            `%${keyword}%`,
            category, 
            brand,
            gender, 
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
            console.log("get all");
            console.error(error);
        }

        return res;
    },

    filterNumberProductsAndPages: async function(keyword, category, brand, gender, startPrice, endPrice, pageSize){
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
        try{
            res = await db.one(query, values);
        }
        catch(error)
        {
            console.log("get page");
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

    getAllBrands: async function(){
        const query = ` SELECT DISTINCT productBrand FROM products GROUP BY productBrand;`;

        let res= [];
        try {
            res = await db.any(query);
        } catch (error) {
            console.error(error);
        }

        return res;
    },

    getAllGenders: async function(){
        const query = ` SELECT DISTINCT productGender FROM products GROUP BY productGender;`;

        let res= [];
        try {
            res = await db.any(query);
        } catch (error) {
            console.error(error);
        }

        return res;
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