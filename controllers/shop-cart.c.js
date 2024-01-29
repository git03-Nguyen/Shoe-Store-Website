const CartList = require('../models/cartlist.m');
const Product = require('../models/product.m');

module.exports = {
    cart: async (req, res, next) => {
        let userId = req.user.id;
        let cartLists = [];
        let total = 0;
        try {
            let temp = parseInt(userId);
            if (temp === null || temp === undefined || isNaN(temp)) return res.end();
            cartLists = await CartList.getCartListsByUserId(temp);

            for (let index = 0; index < cartLists.length; index++) {
                let value = cartLists[index];
                let product = await Product.getProductById(value.productId);
                total += parseFloat(product.productPrice) * parseInt(value.quantity);
                value.productName = product.productName;
                value.productPrice = product.productPrice;
                value.productImage = product.productImage;
                value.sizes = []; // size, index, selected
                for (let i = 0; i < product.productSizes.length; i++) {
                    let size = new Object();
                    size.size = product.productSizes[i];
                    size.index = i;
                    if (value.size == product.productSizes[i]) {
                        value.selectedSizeIndex = i;
                    }

                    value.sizes.push(size);
                }

                value.colors = []; // color, index, selected
                for (let i = 0; i < product.productColors.length; i++) {
                    let color = new Object();
                    color.colorId = product.productColors[i];

                    if (color.colorId == 'c-1') {
                        color.colorText = 'Black';
                    }
                    else if (color.colorId == 'c-2') {
                        color.colorText = 'Blue';
                    }
                    else if (color.colorId == 'c-3') {
                        color.colorText = 'Orange';
                    }
                    else if (color.colorId == 'c-4') {
                        color.colorText = 'Red';
                    }
                    else if (color.colorId == 'c-5') {
                        color.colorText = 'White';
                    }

                    color.index = i;
                    if (value.color == product.productColors[i]) {
                        value.selectedColorIndex = i;
                    }

                    value.colors.push(color);
                }
            }
        } catch (error) {
            console.log(error);
            next(error);
        }

        total = parseFloat(total.toFixed(2));

        return res.render('shop/shop-cart', {
            user: req.user,
            status: 'Shop',
            title: 'Shop Cart',
            cartLists: cartLists,
            subtotal: total,
            total: total,
        });
    }
}   