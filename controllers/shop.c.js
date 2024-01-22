const Product = require('../models/product.m');

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

    console.log("page: " + pages.length);

    return pages;
}

module.exports = {
    getAllProductAtPage: async function(req, res, next){
        try{
            let page = req.query.page;
            let pageSize = process.env.PAGE_SIZE;

            let [productsNumber, pagesNumber] = await Product.getNumberOfProductsAndPages(pageSize);
            let products = await Product.getAllProductsAtPage(page, pageSize);
            let pages = handlePagination(page, pagesNumber);
            
            products.forEach(item =>{ item.productImage = item.productImages[0]});

            res.render('shop/shop', {status: "Shop", currentPage: page, pages: pages, allProducts: products});
        }
        catch(err){
            next(err);
        }
    }
}