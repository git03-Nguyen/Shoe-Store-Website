const Product = require('../models/product.m');
const Category = require('../models/category.m');
const CartList = require('../models/cartlist.m');
const Order = require('../models/order.m');
const OrderDetail = require('../models/orderdetail.m');

function min(a, b) {
    return a <= b ? a : b;
}

function handlePagination(page, pagesNumber) {
    let pages = [];
    for (let i = page - 2; i <= min(page + 2, pagesNumber); i++) {
        if (i >= 1) {
            pages.push(i);
        }
    }

    if (pagesNumber > pages + 2) {
        pages.push('...');
        pages.push(pagesNumber);
    }

    return pages;
}

module.exports = {
    shop: async function (req, res, next) {
        try {
            let page = req.query.page;
            let keyword = req.query.keyword;
            let category = req.query.category;
            let brand = req.query.brand;
            let gender = req.query.gender;
            let startPrice = req.query.startPrice;
            let endPrice = req.query.endPrice;
            let order = req.query.order;

            if (order === null || order === undefined) order = null;

            const MAX_INT = 2147483647 // MAX INT IN POSTGRESQL
            if (endPrice === "infinity") endPrice = MAX_INT;

            let products = [];
            let productsNumber = 0;
            let pagesNumber = 1;

            let pageSize = parseInt(process.env.PAGE_SIZE);

            if (keyword !== null && keyword !== undefined) {
                [productsNumber, pagesNumber] = await Product.filterNumberProductsAndPages(keyword, null, null, null, -1, -1, pageSize);
                products = await Product.filterProductsAtPage(keyword, null, null, null, -1, -1, order, page, pageSize);
            }
            else if (category !== null && category !== undefined) {
                [productsNumber, pagesNumber] = await Product.filterNumberProductsAndPages(null, category, null, null, -1, -1, pageSize);
                products = await Product.filterProductsAtPage(null, category, null, null, -1, -1, order, page, pageSize);
            }
            else if (brand !== null && brand !== undefined) {
                [productsNumber, pagesNumber] = await Product.filterNumberProductsAndPages(null, null, brand, null, -1, -1, pageSize);
                products = await Product.filterProductsAtPage(null, null, brand, null, -1, -1, order, page, pageSize);
            }
            else if (gender !== null && gender !== undefined) {
                [productsNumber, pagesNumber] = await Product.filterNumberProductsAndPages(null, null, null, gender, -1, -1, pageSize);
                products = await Product.filterProductsAtPage(null, null, null, gender, -1, -1, order, page, pageSize);
            }
            else if (startPrice !== null && startPrice !== undefined
                && endPrice !== null && endPrice !== undefined) {
                [productsNumber, pagesNumber] = await Product.filterNumberProductsAndPages(null, null, null, null, parseInt(startPrice), parseInt(endPrice), pageSize);
                products = await Product.filterProductsAtPage(null, null, null, null, parseInt(startPrice), parseInt(endPrice), order, page, pageSize);
            }
            else if (order !== null && order !== undefined) {
                [productsNumber, pagesNumber] = await Product.filterNumberProductsAndPages(null, null, null, null, -1, -1, pageSize);
                products = await Product.filterProductsAtPage(null, null, null, null, -1, -1, order, page, pageSize);
            }
            else {
                [productsNumber, pagesNumber] = await Product.getNumberOfProductsAndPages(pageSize);
                products = await Product.getAllProductsAtPage(page, pageSize);
            }

            let categories = await Category.getAllCategories();
            let brands = await Product.getAllBrands();
            let genders = await Product.getAllGenders();

            let pages = handlePagination(page, pagesNumber);
            let startNumber = (page - 1) * pageSize + 1;
            let endNumber = min(page * pageSize, productsNumber);

            res.render('shop/shop', {
                user: req.user,
                status: "Shop", startNumber: startNumber, endNumber: endNumber,
                productsNumber: productsNumber, currentPage: page, pages: pages,
                allProducts: products, categories: categories, brands: brands, genders: genders
            });
        }
        catch (err) {
            next(err);
        }
    },

    shopAPIGet: async function (req, res, next) {
        try {
            let page = req.query.page;
            let keyword = req.query.keyword;
            let category = req.query.category;
            let brand = req.query.brand;
            let gender = req.query.gender;
            let startPrice = req.query.startPrice;
            let endPrice = req.query.endPrice;
            let order = req.query.order;

            if (order === null || order === undefined) order = null;

            const MAX_INT = 2147483647 // MAX INT IN POSTGRESQL
            if (endPrice === "infinity") endPrice = MAX_INT;

            let products = [];
            let productsNumber = 0;
            let pagesNumber = 1;

            let pageSize = parseInt(process.env.PAGE_SIZE);

            if (keyword !== null && keyword !== undefined) {
                [productsNumber, pagesNumber] = await Product.filterNumberProductsAndPages(keyword, null, null, null, -1, -1, pageSize);
                products = await Product.filterProductsAtPage(keyword, null, null, null, -1, -1, order, page, pageSize);
            }
            else if (category !== null && category !== undefined) {
                [productsNumber, pagesNumber] = await Product.filterNumberProductsAndPages(null, category, null, null, -1, -1, pageSize);
                products = await Product.filterProductsAtPage(null, category, null, null, -1, -1, order, page, pageSize);
            }
            else if (brand !== null && brand !== undefined) {
                [productsNumber, pagesNumber] = await Product.filterNumberProductsAndPages(null, null, brand, null, -1, -1, pageSize);
                products = await Product.filterProductsAtPage(null, null, brand, null, -1, -1, order, page, pageSize);
            }
            else if (gender !== null && gender !== undefined) {
                [productsNumber, pagesNumber] = await Product.filterNumberProductsAndPages(null, null, null, gender, -1, -1, pageSize);
                products = await Product.filterProductsAtPage(null, null, null, gender, -1, -1, order, page, pageSize);
            }
            else if (startPrice !== null && startPrice !== undefined
                && endPrice !== null && endPrice !== undefined) {
                [productsNumber, pagesNumber] = await Product.filterNumberProductsAndPages(null, null, null, null, parseInt(startPrice), parseInt(endPrice), pageSize);
                products = await Product.filterProductsAtPage(null, null, null, null, parseInt(startPrice), parseInt(endPrice), order, page, pageSize);
            }
            else if (order !== null && order !== undefined) {
                [productsNumber, pagesNumber] = await Product.filterNumberProductsAndPages(null, null, null, null, -1, -1, pageSize);
                products = await Product.filterProductsAtPage(null, null, null, null, -1, -1, order, page, pageSize);
            }
            else {
                [productsNumber, pagesNumber] = await Product.getNumberOfProductsAndPages(pageSize);
                products = await Product.getAllProductsAtPage(page, pageSize);
            }

            let pages = handlePagination(page, pagesNumber);
            let startNumber = (page - 1) * pageSize + 1;
            let endNumber = min(page * pageSize, productsNumber);

            res.json({
                user: req.user,
                allProducts: products, currentPage: page, pages: pages,
                startNumber: startNumber, endNumber: endNumber, productsNumber: productsNumber
            });
        }
        catch (err) {
            next(err);
        }
    },

    shopApiPostAddCart: async function (req, res, next) {
        try {
            if (req.user === null || req.user === undefined) {
                data.message = "Please login to add!";
                return res.json(data);
            }

            let userId = req.user.id;
            let size = req.body.size !== null ? parseFloat(req.body.size) : null;
            let color = req.body.color;
            let quantity = req.body.quantity !== null ? parseInt(req.body.quantity) : null;
            let productId = parseInt(req.body.productId);
            let postingDate = new Date();

            let item = await CartList.getCartListByUserIdAndProductId(userId, productId);
            let flag = true;
            let data = new Object();

            if (item === null || item === undefined) {
                let cartList = {
                    size: size,
                    color: color,
                    quantity: quantity,
                    userid: userId,
                    productid: productId,
                    postingdate: postingDate,
                };

                flag = await CartList.addCartList(new CartList(cartList));
                if (flag) {
                    data.message = "Add item successfully";
                }
                else {
                    data.message = "Add item failed";
                }
            }
            else {
                item.quantity = quantity;
                item.size = size;
                item.color = color;
                item.postingDate = postingDate;

                flag = await CartList.updateCartList(item);
                if (flag) {
                    data.message = "Update item successfully";
                }
                else {
                    data.message = "Update item failed";
                }
            }

            return res.json(data);
        }
        catch (err) {
            console.log(err);
            next(err);
        }
    },

    shopApiPostRemoveCart: async (req, res, next) => {
        try {
            let id = parseInt(req.body.id);
            let flag = await CartList.removeCartListById(id);
            let data = new Object();
            if (flag) {
                data.message = 'Remove item succesfully';
            }
            else {
                data.message = 'Remove item failed';
            }

            res.json(data);
        } catch (error) {
            console.log(error);
            next(error);
        }
    },

    shopApiPostUpdateCart: async (req, res, next) => {
        let flag = true;
        let cartLists = req.body.cartLists;
        try {

            for (let i = 0; i < cartLists.length; i++) {
                let cartList = new Object();
                cartList.id = cartLists[i].id;
                cartList.size = parseFloat(cartLists[i].size);
                cartList.color = cartLists[i].color;
                cartList.quantity = parseInt(cartLists[i].quantity);
                cartList.postingdate = new Date();

                await CartList.updateCartList(new CartList(cartList));
            }
        } catch (error) {
            flag = false;
            console.log(error);
        }

        let data = new Object();
        if (flag) {
            data.message = 'Update all items successfully';
        }
        else {
            data.message = 'Update all items failed';
        }

        return res.json(data);
    },

    shopApiPostOrder: async (req, res, next) => {
        let flag = true;
        let userId = req.user.id;
        let fullName = req.body.fullName;
        let shippingAddress = req.body.shippingAddress;
        let contactPhone = req.body.contactPhone;
        let email = req.body.email;
        let total = req.body.total;

        let order = {
            userid: userId,
            fullname: fullName,
            shippingaddress: shippingAddress,
            contactphone: contactPhone,
            email: email,
            total: total,
            orderdate: new Date(),
            paymentmethod: 'Payment Account', // fix data
            orderstatus: 'Waiting For Payment', // default value
        };

        try {
            let orderId = await Order.createOrder(new Order(order));
            if (orderId.id < 0) {
                throw new Error('Insert order failed');
            }
            order.id = parseInt(orderId.id);

            let cartLists = await CartList.getCartListsByUserId(userId);
            for (let i = 0; i < cartLists.length; i++) {
                let orderDetail = {
                    productid: parseInt(cartLists[i].productId),
                    orderid: order.id,
                    quantity: parseInt(cartLists[i].quantity),
                    size: parseFloat(cartLists[i].size),
                    color: cartLists[i].color,
                };

                let temp = await OrderDetail.createOrderDetail(new OrderDetail(orderDetail));
                if (temp < 0) {
                    throw new Error('Insert order detail failed!');
                }
            }
        } catch (error) {
            flag = false;
            console.log(error);
        }

        let data = new Object();
        if (flag) {
            data.message = 'Checkout successfully';
        }
        else {
            data.message = 'Checkout failed';
        }

        return res.json(data);
    },
}