const { db, pgp } = require('./dbConfig');

/*
    id int GENERATED ALWAYS AS IDENTITY,
    userId int not null,
    total real,
    orderDate timestamp,
    paymentMethod varchar(100),
    orderStatus varchar(100),
    contactPhone varchar(20),
    shippingAddress varchar(200),
*/


module.exports = {
    createOrder: async function (order) {
        const query = ` INSERT INTO orders(userId, total, orderDate, paymentMethod, 
            orderStatus, contactPhone, shippingAddress)
            VALUES($1, $2, $3, $4, $5, $6, $7);
        `;

        const values = [
            order.userId,
            order.total,
            order.orderDate,
            order.paymentMethod,
            order.orderStatus,
            order.contactPhone,
            order.shippingAddress,
        ];
        flag = true;
        try {
            await db.none(query, values);
        } catch (error) {
            flag = false;
            console.error(error);
        }

        return flag;
    },

    removeOrder: async function (id) {
        const query = `DELETE FROM orders WHERE id = $1`;
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