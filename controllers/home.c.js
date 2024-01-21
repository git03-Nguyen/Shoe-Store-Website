// const getTop10Products=require('../models/product.m').getTop10Products;

const Product = require('../models/product.m');
exports.home = async (req, res) => {
    try {

        //  let resultTopRating=await getTop05RatingMovies();
        let results = await Product.getTop08Products();
        console.log(results.length);
        let topArrival = [];
        let top_hot_sales = [];
        results.forEach((item, index) => {
            if (index < 4) {
                topArrival.push(item);
            }
            else {
                top_hot_sales.push(item);
            }
        });
        let productOfWeekForSale=results[0];
        res.render('home',
            { listproducts: results,
                toparrival: topArrival,
                top_hot_sales:top_hot_sales,
                product_sale:productOfWeekForSale}
        );


    }
    catch (err) {
        console.log(err);
        res.status(500).send('Error while query top rating');
    }
};