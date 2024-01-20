require('dotenv').config();
const db = require('./db-config');

module.exports = {
    getAllProducts: async function (){
        const query = `
            SELECT * FROM products;
        `;
        let res = null;
        try{
            res = await db.pool.query(query)
        }
        catch(error){
            console.error(error);
        }

        return res;
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

        return res;
    },

    filterProducts: async function(keyword, category, brand, startPrice, endPrice, order){
        let query = '';
        if(order.toLowerCase() === 'asc'){
            query = `
                SELECT * FROM products AS p join categories AS c ON p.categoryId = c.id
                WHERE productName ILIKE $1 AND c.categoryName = $2
                AND p.productBranch = $3 AND p.price >= $4 AND p.price <= $5
                ORDER BY p.productPrice ASC
            `;
        }
        
        if(order.toLowerCase() === 'desc'){
            query = `
                SELECT * FROM products AS p join categories AS c ON p.categoryId = c.id
                WHERE productName ILIKE $1 AND c.categoryName = $2
                AND p.productBranch = $3 AND p.price >= $4 AND p.price <= $5
                ORDER BY p.productPrice DESC
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

        return res;
    }
}