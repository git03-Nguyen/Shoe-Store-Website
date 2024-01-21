// const getTop10Products=require('../models/product.m').getTop10Products;

const Product = require('../models/product.m');
exports.home = async (req, res) => {
    try {
        let bestsellers = await Product.getTop08BestSellerProducts();
        console.log(bestsellers.length);
        let topArrival = await Product.getTop08NewArrivalProducts();

        let hotsales=await Product.getTop04HotSalesProducts();

        //Add attribute for render by handlebars because productimages is array object
        bestsellers.forEach((item, index) => {
            item.productimage=item.productimages[0];
        });

        topArrival.forEach((item, index) => {
            item.productimage=item.productimages[0];
        });

        hotsales.forEach((item, index) => {
            item.productimage=item.productimages[0];
        });

       //Product of week for sale
        let productOfWeekForSale=hotsales[0];

        res.render('home',
            {   
                bestsellers: bestsellers,
                toparrivals: topArrival,
                hotsales:hotsales,
                product_sale:productOfWeekForSale}
        );


    }
    catch (err) {
        console.log(err);
        res.status(500).send('Error while query top rating');
    }
};