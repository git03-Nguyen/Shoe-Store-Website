const db = require('./dbConfig');

module.exports = {
    getCartListByUserId: async function(userId){
        const query = "SELECT * FROM cartlist WHERE userId = $1";
        const values = [userId];
        let res = [];
        try {
            res = await db.any(query, values);
        } catch (error) {
            console.error(error);
        }

        return res;
    },

    // id int GENERATED ALWAYS AS IDENTITY,
	// userId int not null,
	// productId int not null,
	// quantity int,
	// color varchar(100),
	// size real,
	// postingDate timestamp,

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
    }
}