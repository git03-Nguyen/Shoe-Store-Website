const Product = require('../models/product.m');
const Category = require('../models/category.m');
const CartList = require('../models/cartlist.m');
const Order = require('../models/order.m');
const OrderDetail = require('../models/orderdetail.m');

function min(a, b) {
    return a <= b ? a : b;
}

function handlePagination(page, pagesNumber) {
    page = parseInt(page);
    pagesNumber = parseInt(pagesNumber);
    if (isNaN(page) || isNaN(pagesNumber)) {
        return [1];
    }

    let pages = [];
    if (page - 3 > 1) {
        pages.push(1);
        pages.push('...');
    }
    else if (page - 3 == 1) {
        pages.push(1);
    }

    for (let index = page - 2; index <= min(page + 2, pagesNumber); index++) {
        if (index >= 1) {
            pages.push(index);
        }
    }

    if (pagesNumber > page + 3) {
        pages.push('...');
        pages.push(pagesNumber);
    }
    else if (pagesNumber == page + 3) {
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
            let data = new Object();

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

            if (isNaN(quantity)) {
                data.message = 'Invalid quantity!';
                return res.json(data)
            }

            let product = await Product.getProductById(productId);
            if (product === null) {
                data.message = 'The product does not exist!';
                return res.json(data);
            }
            else {
                if (quantity > product.productAvailability) {
                    data.message = 'The number of products is not enough!';
                    return res.json(data);
                }
            }

            let item = await CartList.getCartListByUserIdAndProductId(userId, productId);
            let flag = true;

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
        let data = new Object();

        try {

            for (let i = 0; i < cartLists?.length; i++) {
                let cartList = new Object();
                cartList.id = cartLists[i].id;
                cartList.size = parseFloat(cartLists[i].size);
                cartList.color = cartLists[i].color;
                cartList.quantity = parseInt(cartLists[i].quantity);
                cartList.postingdate = new Date();

                if (isNaN(cartList.quantity)) {
                    data.message = 'Invalid quantity!';
                    return res.json(data)
                }
                let temp = await CartList.getCartListById(cartLists[i].id);
                if (temp === null) {
                    data.message = 'The product is not in cart list!';
                    res.json(data);
                }
                else {
                    let product = await Product.getProductById(temp.productId);
                    if (product === null) {
                        data.message = 'The product does not exist!';
                        return res.json(data);
                    }
                    else {
                        if (cartList.quantity > product.productAvailability) {
                            data.message = 'The number of products is not enough!';
                            return res.json(data);
                        }
                    }
                }

                await CartList.updateCartList(new CartList(cartList));
            }
        } catch (error) {
            flag = false;
            console.log(error);
        }

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
            let cartLists = await CartList.getCartListsByUserId(userId);
            if (cartLists === null || cartLists === undefined) {
                throw new Error('Get cart list failed!');
            }

            if (cartLists.length === 0) {
                throw new Error('Cart list is empty!');
            }

            let orderId = await Order.createOrder(new Order(order));
            if (orderId.id < 0) {
                throw new Error('Insert order failed');
            }

            order.id = parseInt(orderId.id);

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

            // if place order successfully => remove all cartlist
            for (let i = 0; i < cartLists.length; i++) {
                await CartList.removeCartListById(cartLists[i].id);
            }
        } catch (error) {
            flag = false;
            console.log(error);
        }

        let data = new Object();
        if (flag) {
            data.message = 'Checkout successfully';
            data.orderID = order.id;
            data.amount = req.body.total;
        }
        else {
            data.message = 'Checkout failed';
        }

        return res.json(data);
    },
}