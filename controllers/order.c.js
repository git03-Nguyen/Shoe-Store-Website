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

            let statusType = {
                waitingConfirm: "Waiting For Confirm",
                waitingPayment: "Waiting For Payment",
                paid: "Paid Successfully",
                received: "Received"
            }

            let dLength = 0;
            let pageList = [];
            let total = 0;
            if (!orderList) {
                console.log("Error getting order list");
                return res.render('order', {
                    user: req.user,
                });
            } else {
                dLength = parseInt(orderList.length / perpage) + (orderList.length % perpage == 0 ? 0 : 1);
                pageList = Array.from({ length: dLength }, (v, i) => i + 1);
                total = orderList.length;
            }

            res.render('order', {
                user: req.user,
                title: "Order",
                orderList: orderList.slice((queryPage - 1) * perpage, queryPage * perpage),
                statusType: statusType,
                currentPage: queryPage,
                total: total,
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