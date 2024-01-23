const Product = require('../models/product.m');
exports.home = async (req, res, next) => {
    try {
        let bestsellers = await Product.getTop08BestSellerProducts();
        let topArrival = await Product.getTop08NewArrivalProducts();
        let hotsales=await Product.getTop04HotSalesProducts();

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