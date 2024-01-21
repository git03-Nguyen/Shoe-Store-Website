const dbProduct = require('../utils/dbProduct');

module.exports = class Product {
    constructor(product){
        this.id = product.id;
        this.categoryId = product.categoryid;
        this.productName = product.productname;
        this.productBrand = product.productbrand;
        this.productSizes = product.productsizes;
        this.procductColors = product.procductcolors;
        this.productPrice = product.productprice;
        this.productPriceBeforeDiscount = product.productpricebeforediscount;
        this.productDescription = product.productdescription;
        this.productImages = product.productimages;
        this.productVideos = product.productvideos;
        this.productGender = product.productgender;
        this.shippingCharge = product.shippingcharge;
        this.productAvailability = product.productavailability;
        this.postingDate = product.postingdate;
        this.updateDate = product.updatedate;
    }

    static async getAllProductsAtPage(page, pageSize){
        let data = await dbProduct.getAllProductsAtPage(page, pageSize);

        let list = [];
        for(let i = 0; i < data.length; i++){
            list.push(new Product(data[i]));
        }

        return list;
    }

    static async getNumberOfProductsAndPages(pageSize){
        return await dbProduct.getNumberOfProductsAndPages(pageSize);
    }

    static async filterProductsAtPage(keyword, category, brand, startPrice, endPrice, order, page, pageSize){
        let data = await dbProduct.filterProductsAtPage(keyword, category, brand, startPrice, endPrice, order, page, pageSize);

        let list = [];
        for(let i = 0; i < data.length; i++){
            list.push(new Product(data[i]));
        }

        return list;
    }

    static async filterNumberProductsAndPages(keyword, category, brand, startPrice, endPrice, order, pageSize){
        return await filterNumberProductsAndPages(keyword, category, brand, startPrice, endPrice, order, pageSize)
    }

    static async getTop08BestSellerProducts(){
        try{
            let data=await db.getTopBestSellerProducts();
            return data;
        }
        catch(err){
            console.log(err);
           throw err;
        }
    }

    static async getTop08NewArrivalProducts(){
        try{
            let data=await db.getTopNewArrivalProducts();
            return data;
        }
        catch(err){
            console.log(err);
           throw err;
        }
    }
    
    static async getTop04HotSalesProducts(){
        try{
            let data=await db.getTopHotSalesProducts();
            return data;
        }
        catch(err){
            console.log(err);
           throw err;
        }
    }
}