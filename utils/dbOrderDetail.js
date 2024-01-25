const { db, pgp } = require('./dbConfig');

/*
    id int GENERATED ALWAYS AS IDENTITY,
    orderId int not null,
    productId int not null,
    quantity int check(quantity >= 1) not null,
    color varchar(100),
    size real,
*/

module.exports = {
    createOrderDetail: async function (orderDetail) {
        const query = `INSERT INTO orderdetail (id, orderId, productId, quantity, color, size)
            VALUES($1, $2, $3, $4, $5, $6);
        `;

        const values = [
            orderDetail.id,
            orderDetail.orderId,
            orderDetail.productId,
            orderDetail.quantity,
            orderDetail.color,
            orderDetail.size
        ];

        let flag = true;
        try {
            await db.none(query, values);
        } catch (error) {
            flag = false;
            console.error(error);
        }

        return flag;
    },

    removeOrderDetail: async function (id) {
        const query = `DELETE FROM orderDetail WHERE id = $1`;
        let flag = true;

        try {
            await db.none(query, [id]);
        } catch (error) {
            flag = false;
            console.error(error);
        }

        return flag;
    },
}