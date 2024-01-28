const Order = require('../models/order.m');
const OrderDetail = require('../models/orderdetail.m');

module.exports = {
    renderOrderPage: async (req, res, next) => {
        try {
            let userID = req.user.id;
            let queryPage = req.query.page || 1;
            const perpage = 5;

            let orderList = [];

            if (req.user.isadmin) {
                orderList = await Order.getAllOrders();
            } else {
                orderList = await Order.getOrdersByUser(userID);
            }
            if (!orderList) {
                console.log("Error getting order list");
            }

            let statusType = {
                waiting: "Waiting For Payment",
                paid: "Paid Successfully",
                received: "Received"
            }

            let dLength = parseInt(orderList.length / perpage) + (orderList.length % perpage == 0 ? 0 : 1);
            let pageList = Array.from({ length: dLength }, (v, i) => i + 1);

            res.render('order', {
                user: req.user,
                orderList: orderList.slice((queryPage - 1) * perpage, queryPage * perpage),
                statusType: statusType,
                currentPage: queryPage,
                total: orderList.length,
                pageList: pageList,
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

    handleUpdateStatusOrder: async (req, res, next) => {
        try {
            let { orderID, status } = req.body;

            let updatedOrder = await Order.updateOrderStatus(orderID, status);

            return res.json(updatedOrder);
        } catch (error) {
            next(error);
        }
    },
}