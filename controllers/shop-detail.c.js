const Product = require('../models/product.m');
const MAX_RELATVIE_PRODUCTS = 6;

function min(a, b) {
    return a < b ? a : b;
}

module.exports = {
    detail: async (req, res, next) => {
        let id = req.query.id;
        let product = null;
        let relativeProducts = [];

        try {
            let temp = parseInt(id);
            if (temp === null || temp === undefined || isNaN(temp)) res.end();
            product = await Product.getProductById(temp);

            // get relative products
            let list = await Product.getRelativeProductsByCategoryId(product.categoryId);
            for (let i = 0; i < min(list.length, MAX_RELATVIE_PRODUCTS); i++) {
                relativeProducts.push(list[i]);
            }
        } catch (error) {
            console.log(error);
            next(error);
        }

        // create thumbImageList & create bigImageList
        let thumbImageList = [];
        let bigImageList = [];
        let index = 0;

        for (index = 0; index < product.productThumbImages.length; index++) {
            let thumbImage = new Object();
            thumbImage.tabId = index + 1;
            thumbImage.image = product.productThumbImages[index];
            thumbImageList.push(thumbImage);

            let bigImage = new Object();
            bigImage.tabId = index + 1;
            bigImage.image = product.productBigImages[index];
            bigImageList.push(bigImage);
        }

        // create video
        let video = new Object();
        video.tabId = index + 1;
        video.productVideoThumbImage = product.productVideoThumbImage;
        video.productVideoBigImage = product.productVideoBigImage;
        video.productVideo = product.productVideo;

        // create sizes
        let sizes = []
        for (let i = 0; i < product.productSizes.length; i++) {
            let size = new Object();
            size.index = i;
            size.size = product.productSizes[i];
            sizes.push(size);
        }

        // create colors
        let colors = [];
        for (let i = 0; i < product.productColors.length; i++) {
            let color = new Object();
            color.index = i;
            color.color = product.productColors[i];
            colors.push(color);
        }


        res.render('shop/shop-detail', {
            user: req.user,
            status: 'Shop',
            title: 'Shop Detail',
            thumbImageList: thumbImageList,
            bigImageList: bigImageList,
            video: video,
            sizes: sizes,
            colors: colors,
            productName: product.productName,
            productPrice: product.productPrice,
            productDescription: product.productDescription,
            productAdditionalInformation: product.productAdditionalInformation,
            productId: product.id,
            relativeProducts: relativeProducts,
        });
    }
}