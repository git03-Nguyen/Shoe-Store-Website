const dbProduct = require('../utils/dbProduct');

module.exports = class Product {
    constructor(product){
        this.id = product.id;
        this.categoryId = product.categoryId;
        this.productName = product.productName;
        this.productCompany = product.productCompany;
        this.productSize = product.productSize;
        this.procductColor = product.procductColor;
        this.productPrice = product.productPrice;
        this.productPriceBeforeDiscount = product.productPriceBeforeDiscount;
        this.productDescription = product.productDescription;
        this.productImage1 = product.productImage1;
        this.productImage2 = product.productImage2;
        this.productImage3 = product.productImage3;
        this.productVideo = product.productVideo;
        this.shippingCharge = product.shippingCharge;
        this.productAvailability = product.productAvailability;
        this.postingDate = product.postingDate;
        this.updateDate = product.updateDate;
    }
}