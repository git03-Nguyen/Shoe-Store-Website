const dbProduct = require('../utils/dbProduct');

module.exports = class Product {
    constructor(product){
        this.id = product.id;
        this.categoryId = product.categoryid;
        this.productName = product.productname;
        this.productBrand = product.productbrand;
        this.productSizes = product.productsizes;
        this.productColors = product.productcolors;
        this.productPrice = product.productprice;
        this.productPriceBeforeDiscount = product.productpricebeforediscount;
        this.productDescription = product.productdescription;
        this.productImage = product.productimage;
        this.productThumbImages = product.productthumbimages;
        this.productBigImages = product.productbigimages;
        this.productVideoThumbImage = product.productvideothumbimage;
        this.productVideoBigImage = product.productvideobigimage;
        this.productVideo = product.productvideo;
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

    static async filterProductsAtPage(keyword, category, brand, gender, startPrice, endPrice, order, page, pageSize){
        let data = await dbProduct.filterProductsAtPage(keyword, category, brand, gender, startPrice, endPrice, order, page, pageSize);

        let list = [];
        for(let i = 0; i < data.length; i++){
            list.push(new Product(data[i]));
        }

        return list;
    }

    static async filterNumberProductsAndPages(keyword, category, brand, gender, startPrice, endPrice, pageSize){
        return await dbProduct.filterNumberProductsAndPages(keyword, category, brand, gender, startPrice, endPrice, pageSize)
    }

    static async getAllBrands(){
        let brands = []
        let data = await dbProduct.getAllBrands();
        for(let i = 0; i < data.length; i++){
            brands.push(data[i].productbrand);
        }

        return brands
    }

    static async getAllGenders(){
        let genders = []
        let data = await dbProduct.getAllGenders();
        for(let i = 0; i < data.length; i++){
            genders.push(data[i].productgender);
        }

        return genders
    }

    static async getProductById(id){
        let data = await dbProduct.getProductById(id);
        return new Product(data);
    }

    static async getTop08BestSellerProducts(){
        let list = [];

        try{
            let data= await dbProduct.getTopBestSellerProducts();
            for(let i = 0; i < data.length; i++){
                list.push(new Product(data[i]));
            }
        }
        catch(err){
            console.log(err);
            throw err;
        }

        return list;
    }

    static async getTop08NewArrivalProducts(){
        let list = [];

        try{
            let data=await dbProduct.getTopNewArrivalProducts();
            for(let i = 0; i < data.length; i++){
                list.push(new Product(data[i]));
            }
        }
        catch(err){
            console.log(err);
           throw err;
        }

        return list;
    }
    
    static async getTop04HotSalesProducts(){
        let list = [];

        try{
            let data=await dbProduct.getTopHotSalesProducts();
            for(let i = 0; i < data.length; i++){
                list.push(new Product(data[i]));
            }
        }
        catch(err){
            console.log(err);
           throw err;
        }

        return list;
    }
}