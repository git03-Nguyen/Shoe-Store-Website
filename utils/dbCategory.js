const db = require('./dbConfig');

module.exports = {
    getAllCategories: async function(){
        const query = `SELECT * FROM categories;`;

        let res = [];
        try {
            res = await db.any(query);
        } catch (error) {
            console.log(error);
        }

        return res;
    }
}