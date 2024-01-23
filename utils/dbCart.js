const {db, pgp} = require('./dbConfig');

module.exports = {
    getCartListById: async function(id){
        const query = "SELECT * FROM cartlist WHERE id = $1";
        const values = [id];
        let res = null;
        try {
            res = await db.one(query, values);
        } catch (error) {
            if (error instanceof pgp.errors.QueryResultError && error.code === pgp.errors.queryResultErrorCode.noData) {
                // Handle the case when no data is found
                console.log('No data found.');
            }
            else{
                if (error instanceof pgp.errors.QueryResultError && error.code === pgp.errors.queryResultErrorCode.noData) {
                    // Handle the case when no data is found
                    console.log('No data found.');
                }
                else{
                    console.error(error);
                }
            }
        }

        return res;
    },

    getCartListsByUserId: async function(userId){
        const query = "SELECT * FROM cartlist WHERE userId = $1";
        const values = [userId];
        let res = [];
        try {
            res = await db.any(query, values);
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

    getCartListByUserIdAndProductId: async function(userId, productId){
        const query = "SELECT * FROM cartlist WHERE userId = $1 AND productId = $2";
        const values = [userId, productId];
        let res = null;
        try {
            res = await db.one(query, values);
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

    addCartList: async function (cartList){
        const query = `INSERT INTO cartlist(userId, productId, quantity, color, size, postingDate)
            VALUES($1, $2, $3, $4, $5, $6)
            ON CONFLICT (userId, productId) DO NOTHING;
        `;
        const values = [
            cartList.userId,
            cartList.productId,
            cartList.quantity,
            cartList.color,
            cartList.size,
            cartList.postingDate
        ];

        let flag = true;
        try{
            await db.none(query, values);
        }
        catch(error){
            console.error(error);
            flag = false;
        }

        return flag;
    },

    updateCartList: async function(cartList){
        const query = `UPDATE cartlist
            SET quantity = $1, color = $2, size = $3, postingDate = $4 
            WHERE id = $5;
        `;

        const values = [
            cartList.quantity,
            cartList.color,
            cartList.size,
            cartList.postingDate,
            cartList.id,
        ];

        let res = true;
        try {
            await db.none(query, values);
        } catch (error) {
            console.log(error);
            res = false;
        }

        return res;
    }
}