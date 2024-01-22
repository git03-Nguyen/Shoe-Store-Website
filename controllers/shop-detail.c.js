const Product = require('../models/product.m');

module.exports = {
    detail: async (req, res, next) => {
        let id = req.query.id;
        let product = null;
        
        try {
            let temp = parseInt(id);
            if(temp === null || temp === undefined || isNaN(temp)) return null;
            product = await Product.getProductById(temp);
        } catch (error) {
            console.log(error);
            next(error);            
        }

        res.render('shop/shop-detail');
    }
}