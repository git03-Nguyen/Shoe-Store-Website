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

            let orderDetailList = [];
            for (let i = 0; i < orderList.length; i++) {
                let orderDetails = await OrderDetail.getAllOrderDetailByOrder(orderList[i].id);
                if (!orderDetails) {
                    console.log("Error getting order detail for order with id: " + orderList[i].id);
                }

                for (let j = 0; j < orderDetails.length; j++) {
                    orderDetailList.push(orderDetails[j]);
                }
            }


            res.render('order', {
                user: req.user,
                orderList: orderList,
                orderDetailList: orderDetailList,
            });

        } catch (error) {
            next(error);
        }
    },
}