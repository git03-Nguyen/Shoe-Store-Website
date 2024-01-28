const dbOrder = require('../utils/dbOrder');

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

module.exports = class Order {
    constructor(order) {
        this.id = order.id;
        this.userId = order.userid;
        this.total = order.total;
        this.orderDate = order.orderdate;
        this.paymentMethod = order.paymentmethod;
        this.orderStatus = order.orderstatus;
        this.contactPhone = order.contactphone;
        this.shippingAddress = order.shippingaddress;
        this.email = order.email;
        this.fullName = order.fullname;
    }

    static async createOrder(order) {
        return await dbOrder.createOrder(order);
    }

    static async removeOrder(id) {
        return await dbOrder.removeOrder(id);
    }

    static async countOrdersByDate(date) {
        return await dbOrder.countOrdersByDate(date);
    }

    static async countOrdersByCategories(from, to) {
        const result = await dbOrder.countOrdersByCategories(from, to);
        // change the format of the result to 2 columns: category, count
        const data = {
            categories: [],
            counts: [],
        };
        result.forEach(item => {
            data.categories.push(item.categoryname);
            data.counts.push(item.total_quantity);
        });
        return data;
    }
}
