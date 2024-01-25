const Order = require('../models/order.m');
const detailOrder = require('../models/orderdetail.m');
const User = require('../models/user.m');
const CartList = require('../models/cartlist.m');
const Product = require('../models/product.m');

module.exports = {
    checkout: async (req, res, next) => {
        try {
            // get data from user table
            let userId = req.user.id;
            let user = null;
            let fullName = '';
            let shippingAddress = '';
            let contactPhone = '';
            let email = '';
            try {
                user = await User.getUserByID(userId);

                // set default value;
                if (user !== null || user !== undefined) {
                    fullName = user.fullname;
                    shippingAddress = user.address;
                    contactPhone = user.phonenumber;
                    email = user.email;
                }
            } catch (error) {
                console.log(error);
            }

            let cartLists = await CartList.getCartListsByUserId(userId);

            let total = 0;
            for (let i = 0; i < cartLists.length; i++) {
                let product = await Product.getProductById(cartLists[i].productId);
                cartLists[i].productPrice = product.productPrice;
                cartLists[i].productName = product.productName;
                cartLists[i].total = parseFloat(product.productPrice) * parseInt(cartLists[i].quantity);
                cartLists[i].no = i + 1;
                total += cartLists[i].total;
            }

            res.render('shop/shop-checkout', {
                user: req.user,
                status: 'Shop',
                cartLists: cartLists,
                subtotal: total,
                total: total,
                fullName: fullName,
                shippingAddress: shippingAddress,
                contactPhone: contactPhone,
                email: email
            });
        } catch (error) {
            next(error);
        }

        // render page
    },
}