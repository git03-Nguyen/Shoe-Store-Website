const db=require('../utils/dbProvider');

module.exports=class Product{
    constructor(pd){
        this.id=pd.id;
        this.categoryid=pd.categoryid;
        this.productname=pd.productname;
        this.productcompany=pd.productcompany;
        this.productprice=pd.productprice;
        this.productdescription=pd.productdescription;
        this.productimage1=pd.productimage1;
        this.shippingcharge=pd.shippingcharge;
        this.productavailability=pd.productavailability;
        this.postingdate=pd.postingdate;
        this.updatedate=pd.updatedate;
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