//import Product
const Product = require('../models/product.m');
const Category = require('../models/category.m');
const upload = require('../utils/multerUpload/productImage.upload');
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
    manageProducts: async function (req, res, next) {
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

            res.render('admin/products-management', {
                user: req.user,
                startNumber: startNumber, endNumber: endNumber,
                productsNumber: productsNumber, currentPage: page, pages: pages,
                allProducts: products, categories: categories, brands: brands, genders: genders
            });
        }
        catch (err) {
            next(err);
        }
    },

    adminAPIGetProducts: async function (req, res, next) {
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

    adminAPIPostProduct: async function (req, res, next) {
        let product = JSON.parse(req.body.product);

        product.productsizes.forEach((value, index, array) => {
            product.productsizes[index] = parseFloat(value);
        });

        let data = new Object();

        if (product.isuploadimage) {
            console.log("upload image and assign new path to product image");
            product.productimage = '/img/product/' + req.file.filename;
        }

        if (product.id === null || product.id === undefined) {
            try {
                let id = await Product.addProduct(new Product(product));
                if (id < 0) {
                    data.message = "Add product failed";
                }
                else {
                    data.message = "Add product successfully";
                }

                return res.json(data);
            }
            catch (err) {
                return next(err);
            }
        }
        else {
            try {
                let flag = await Product.updateProduct(new Product(product));
                if (flag) {
                    data.message = "Update product successfully";
                }
                else {
                    data.message = "Update product failed";
                }

                return res.json(data);
            }
            catch (err) {
                return next(err);
            }
        }
    },

    adminAPIGetProductById: async function (req, res, next) {
        let id = parseInt(req.query.id);
        let product = null;
        if (!isNaN(id)) {
            product = await Product.getProductById(id);
        }

        res.json(product);
    },

    adminAPIDeleteProductById: async function (req, res, next) {
        let id = parseInt(req.query.id);
        let data = new Object();
        console.log("__id: " + id);
        if (!isNaN(id)) {
            try {
                let flag = await Product.deleteProduct(id);
                if (flag) {
                    data.message = "Delete product successfully";
                }
                else {
                    data.message = "Delete product failed";
                }
            }
            catch (err) {
                return next(err);
            }
        }
        else {
            data.message = "Delete product failed";
        }

        res.json(data);
    }
}
