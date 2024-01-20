const db=require('../utils/dbProvider');

// module.exports={
//     getTop10Products: async ()=>{
//         try{
//             let data=db.getTop10Products();
//             return data;
//         }
//         catch(err){
//             console.log(err);
//            throw err;
//         }
//     },
    
// }

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
    static async getTop08Products(){
        try{
            let data=await db.getTop08Products();
            return data;
        }
        catch(err){
            console.log(err);
           throw err;
        }
    }
}