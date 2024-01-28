const Order = require('../models/order.m');
const OrderDetail = require('../models/orderdetail.m');

module.exports = {
    renderOrderPage: async (req, res, next) => {
        try {
            let userID = req.user.id;

            let orderList = [];

            if (req.user.isadmin) {
                orderList = await Order.getAllOrders();
            } else {
                orderList = await Order.getOrdersByUser(userID);
            }
            if (!orderList) {
                console.log("Error getting order list");
            }

            res.render('order', {
                user: req.user,
                orderList: orderList,
            });

        } catch (error) {
            next(error);
        }
    },

    handleGetDetailOrder: async (req, res, next) => {
        try {
            let { orderID } = req.body;

            let orderDetailList = await OrderDetail.getAllOrderDetailByOrder(orderID);

            return res.json(orderDetailList);
        } catch (error) {
            next(error);
        }
    },
}