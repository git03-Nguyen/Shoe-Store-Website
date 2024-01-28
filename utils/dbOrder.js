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
    email varchar(200),
*/

function formatDateTime(dataTime) {

    const options = {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    };

    return new Intl.DateTimeFormat('en-US', options).format(dataTime);
}

module.exports = {

    createOrder: async function (order) {
        const query = ` INSERT INTO orders(userId, total, orderDate, paymentMethod, 
            orderStatus, contactPhone, shippingAddress, email, fullName)
            VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING id;
        `;

        const values = [
            order.userId,
            order.total,
            order.orderDate,
            order.paymentMethod,
            order.orderStatus,
            order.contactPhone,
            order.shippingAddress,
            order.email,
            order.fullName,
        ];
        let res = -1;
        try {
            res = await db.one(query, values);
        } catch (error) {
            console.error(error);
        }

        return res;
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

    countOrdersByDate: async function (date) {
        const query = `
            SELECT COALESCE(SUM(orderdetail.quantity), 0) as counts 
            FROM orders join orderdetail on orders.id = orderdetail.orderid
            WHERE orders.orderdate = $1
            GROUP BY orders.orderdate
        `;
        let res;
        try {
            res = await db.one(query, [date]);
            console.log(res);
        } catch (error) {
            console.error(error);
        }
        if (res) {
            return res.counts;
        } else {
            return 0;
        }
    },

    countOrdersByCategories: async function (from, to) {
        const query = `
        SELECT categories.categoryname, COALESCE(SUM(orderdetail.quantity), 0) AS total_quantity
        FROM categories
        LEFT JOIN products ON categories.id = products.categoryid
        LEFT JOIN orderdetail ON products.id = orderdetail.productid
        LEFT JOIN orders ON orderdetail.orderid = orders.id AND DATE(orders.orderdate) >= $1 AND DATE(orders.orderdate) <= $2
        GROUP BY categories.id, categories.categoryname;
        `;
        let res;
        try {
            res = await db.any(query, [from, to]);
        } catch (error) {
            console.error(error);
        }
        return res;
    },

    updateOrderStatus: async (orderID, status) => {
        const query = `
            UPDATE orders
            SET orderstatus = $1
            WHERE id = $2
            RETURNING *;
        `;
        let res;
        try {
            res = await db.query(query, [status, orderID]);

            if (!res || res.length <= 0) {
                res = null;
            } else {
                res = res[0];
            }
        } catch (error) {
            console.error(error);
        }
        return res;
    },

    getAllOrders: async () => {
        const query = `
            SELECT *
            FROM orders
            ORDER BY orderdate DESC, id DESC, orderstatus ASC
        `;

        let data = null;

        try {
            data = await db.query(query);
            if (data && data.length > 0) {
                data = data;

                for (let i = 0; i < data.length; i++) {
                    data[i].orderdate = formatDateTime(data[i].orderdate);
                }
            } else {
                data = null;
            }
        } catch (error) {
            console.error(error);
        }
        return data;
    },

    getOrdersByUser: async (userID) => {
        const query = `
            SELECT *
            FROM orders
            WHERE userid = $1
            ORDER BY orderdate DESC, id DESC, orderstatus ASC
        `;

        let data = null;

        try {
            data = await db.query(query, [userID]);
            if (data && data.length > 0) {
                data = data;

                for (let i = 0; i < data.length; i++) {
                    data[i].orderdate = formatDateTime(data[i].orderdate);
                }
            } else {
                data = null;
            }
        } catch (error) {
            console.error(error);
        }
        return data;
    },

    getOrderByID: async (orderID) => {
        const query = `
            SELECT *
            FROM orders
            WHERE id = $1
        `;

        let data = null;

        try {
            data = await db.query(query, [orderID]);
            if (data && data.length > 0) {
                data = data[0];

                data.orderdate = formatDateTime(data.orderdate);
            } else {
                data = null;
            }
        } catch (error) {
            console.error(error);
        }
        return data;
    },
};