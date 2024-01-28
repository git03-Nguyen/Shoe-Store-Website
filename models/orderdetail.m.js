const dbDetailOrder = require('../utils/dbOrderDetail');

/*
    id int GENERATED ALWAYS AS IDENTITY,
    orderId int not null,
    productId int not null,
    quantity int check(quantity >= 1) not null,
    color varchar(100),
    size real,
*/

module.exports = class OrderDetail {
    constructor(orderDetail) {
        this.id = orderDetail.id
        this.orderId = orderDetail.orderid;
        this.productId = orderDetail.productid;
        this.quantity = orderDetail.quantity;
        this.color = orderDetail.color;
        this.size = orderDetail.size;
    }

    static async createOrderDetail(orderDetail) {
        return await dbDetailOrder.createOrderDetail(orderDetail);
    }

    static async removeOrderDetail(id) {
        return await dbDetailOrder.removeOrderDetail(id);
    }

    static async getAllOrderDetailByOrder(orderID) {
        let data = await dbDetailOrder.getAllOrderDetailByOrder(orderID);
        return data;
    }

}