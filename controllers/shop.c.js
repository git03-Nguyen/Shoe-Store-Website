const Product = require('../models/product.m');
const Category = require('../models/category.m');

function min(a, b){
    return a <= b ? a : b;
}

function handlePagination(page, pagesNumber){
    let pages = [];
    for(let i = page -2; i <= min(page + 2, pagesNumber); i++){
        if(i >= 1){
            pages.push(i);
        }
    }

    if(pagesNumber > pages + 2){
        pages.push('...');
        pages.push(pagesNumber);
    }

    return pages;
}

module.exports = {
    shop: async function(req, res, next){
        try{
            let page = req.query.page;
            let keyword = req.query.keyword;
            let category = req.query.category;
            let brand = req.query.brand;
            let gender = req.query.gender;
            let startPrice = req.query.startPrice;
            let endPrice = req.query.endPrice;
            let order = req.query.order;

            if(order === null || order === undefined) order = null;
            
            const MAX_INT =2147483647 // MAX INT IN POSTGRESQL
            if(endPrice === "infinity") endPrice = MAX_INT;

            let products = [];
            let productsNumber = 0;
            let pagesNumber = 1;

            let pageSize = parseInt(process.env.PAGE_SIZE);

            if(keyword !== null && keyword !== undefined){
                [productsNumber, pagesNumber] = await Product.filterNumberProductsAndPages(keyword, null, null, null, -1, -1, pageSize);
                products = await Product.filterProductsAtPage(keyword, null, null, null, -1, -1, order, page, pageSize);
            }
            else if(category !== null && category !== undefined){
                [productsNumber, pagesNumber] = await Product.filterNumberProductsAndPages(null, category, null, null, -1, -1, pageSize);
                products = await Product.filterProductsAtPage(null, category, null, null, -1, -1, order, page, pageSize);
            }
            else if(brand !== null && brand !== undefined){
                [productsNumber, pagesNumber] = await Product.filterNumberProductsAndPages(null, null, brand, null, -1, -1, pageSize);
                products = await Product.filterProductsAtPage(null, null, brand, null, -1, -1, order, page, pageSize);
            }
            else if(gender !== null && gender !== undefined){
                [productsNumber, pagesNumber] = await Product.filterNumberProductsAndPages(null, null, null, gender, -1, -1, pageSize);
                products = await Product.filterProductsAtPage(null, null, null,gender, -1, -1, order, page, pageSize);
            }
            else if(startPrice !== null && startPrice !== undefined
                && endPrice !== null && endPrice !== undefined){
                [productsNumber, pagesNumber] = await Product.filterNumberProductsAndPages(null, null, null, null, parseInt(startPrice), parseInt(endPrice), pageSize);
                products = await Product.filterProductsAtPage(null, null, null, null, parseInt(startPrice), parseInt(endPrice), order, page, pageSize);
                console.log("in price compare");
            }
            else if(order !== null && order !== undefined){
                [productsNumber, pagesNumber] = await Product.filterNumberProductsAndPages(null, null, null, null, -1, -1, pageSize);
                products = await Product.filterProductsAtPage(null, null, null, null, -1, -1, order, page, pageSize);
            }
            else{
                [productsNumber, pagesNumber] = await Product.getNumberOfProductsAndPages(pageSize);
                products = await Product.getAllProductsAtPage(page, pageSize);
            }
        
            let categories = await Category.getAllCategories();
            let brands = await Product.getAllBrands();
            let genders = await Product.getAllGenders();

            let pages = handlePagination(page, pagesNumber);
            let startNumber = (page-1)*pageSize + 1;
            let endNumber = min(page*pageSize, productsNumber);
            
            products.forEach(item =>{ item.productImage = item.productImages[0]});

            res.render('shop/shop', {status: "Shop", startNumber: startNumber, endNumber: endNumber, 
                productsNumber: productsNumber, currentPage: page, pages: pages,
                allProducts: products,categories: categories, brands: brands, genders: genders});
        }
        catch(err){
            next(err);
        }
    },

    shopAPIGet: async function(req, res, next){
        try{
            let page = req.query.page;
            let keyword = req.query.keyword;
            let category = req.query.category;
            let brand = req.query.brand;
            let gender = req.query.gender;
            let startPrice = req.query.startPrice;
            let endPrice = req.query.endPrice;
            let order = req.query.order;

            if(order === null || order === undefined) order = null;
            
            const MAX_INT =2147483647 // MAX INT IN POSTGRESQL
            if(endPrice === "infinity") endPrice = MAX_INT;

            let products = [];
            let productsNumber = 0;
            let pagesNumber = 1;

            let pageSize = parseInt(process.env.PAGE_SIZE);

            if(keyword !== null && keyword !== undefined){
                [productsNumber, pagesNumber] = await Product.filterNumberProductsAndPages(keyword, null, null, null, -1, -1, pageSize);
                products = await Product.filterProductsAtPage(keyword, null, null, null, -1, -1, order, page, pageSize);
            }
            else if(category !== null && category !== undefined){
                [productsNumber, pagesNumber] = await Product.filterNumberProductsAndPages(null, category, null, null, -1, -1, pageSize);
                products = await Product.filterProductsAtPage(null, category, null, null, -1, -1, order, page, pageSize);
            }
            else if(brand !== null && brand !== undefined){
                [productsNumber, pagesNumber] = await Product.filterNumberProductsAndPages(null, null, brand, null, -1, -1, pageSize);
                products = await Product.filterProductsAtPage(null, null, brand, null, -1, -1, order, page, pageSize);
            }
            else if(gender !== null && gender !== undefined){
                [productsNumber, pagesNumber] = await Product.filterNumberProductsAndPages(null, null, null, gender, -1, -1, pageSize);
                products = await Product.filterProductsAtPage(null, null, null,gender, -1, -1, order, page, pageSize);
            }
            else if(startPrice !== null && startPrice !== undefined
                && endPrice !== null && endPrice !== undefined){
                [productsNumber, pagesNumber] = await Product.filterNumberProductsAndPages(null, null, null, null, parseInt(startPrice), parseInt(endPrice), pageSize);
                products = await Product.filterProductsAtPage(null, null, null, null, parseInt(startPrice), parseInt(endPrice), order, page, pageSize);
                console.log("in price compare");
            }
            else if(order !== null && order !== undefined){
                [productsNumber, pagesNumber] = await Product.filterNumberProductsAndPages(null, null, null, null, -1, -1, pageSize);
                products = await Product.filterProductsAtPage(null, null, null, null, -1, -1, order, page, pageSize);
            }
            else{
                [productsNumber, pagesNumber] = await Product.getNumberOfProductsAndPages(pageSize);
                products = await Product.getAllProductsAtPage(page, pageSize);
            }

            let pages = handlePagination(page, pagesNumber);
            let startNumber = (page-1)*pageSize + 1;
            let endNumber = min(page*pageSize, productsNumber);
            
            products.forEach(item =>{ item.productImage = item.productImages[0]});

            res.json({allProducts: products, currentPage: page, pages: pages,
                startNumber: startNumber, endNumber: endNumber, productsNumber: productsNumber});
        }
        catch(err){
            next(err);
        }
    },
}