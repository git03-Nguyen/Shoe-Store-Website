const Product = require('../models/product.m');
exports.home = async (req, res, next) => {
    try {
        let bestsellers = await Product.getTop08BestSellerProducts();
        let topArrival = await Product.getTop08NewArrivalProducts();
        let hotsales=await Product.getTop04HotSalesProducts();

        //Add attribute for render by handlebars because productimages is array object
        bestsellers.forEach((item, index) => {
            item.productImage=item.productImages[0];
        });

        topArrival.forEach((item, index) => {
            item.productImage=item.productImages[0];
        });

        hotsales.forEach((item, index) => {
            item.productImage=item.productImages[0];
        });

       //Product of week for sale
        let productOfWeekForSale=hotsales[0];

        res.render('home',
            {   status: "Home",
                user: req.user,
                bestsellers: bestsellers,
                toparrivals: topArrival,
                hotsales: hotsales,
                product_sale:productOfWeekForSale
            }
        );
    }
    catch (err) {
        console.log(err);
        next(err);
    }
};