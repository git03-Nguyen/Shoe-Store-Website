const {db, pgp} = require('./dbConfig');

module.exports = {
    getAllCategories: async function(){
        const query = `SELECT * FROM categories;`;

        let res = [];
        try {
            res = await db.any(query);
        } catch (error) {
            if (error instanceof pgp.errors.QueryResultError && error.code === pgp.errors.queryResultErrorCode.noData) {
                // Handle the case when no data is found
                console.log('No data found.');
            }
            else{
                console.error(error);
            }
        }

        return res;
    },
    editCategory: async function(id, name,description){
        const query = `UPDATE categories SET categoryname = $1, categorydescription = $2, updatedate=NOW() WHERE id = $3;`;
        let value=[name,description,id];
        let res = [];
        try {
            res = await db.any(query,value);
        } catch (error) {
            if (error instanceof pgp.errors.QueryResultError && error.code === pgp.errors.queryResultErrorCode.noData) {
                // Handle the case when no data is found
                console.log('No data found.');
            }
            else{
                console.error(error);
            }
 
       }
       return res;

    }
}