const { as } = require('pg-promise');

const pgp=require('pg-promise')({
    capSQL:true
});


const cn={
    host:process.env.DBHOST,
    port:process.env.DBPORT,
     database:process.env.DBNAME,
    user:process.env.DBUSER,
    password:process.env.DBPASSWORD,
    max:30
}

let db= pgp(cn);

module.exports={
    db,
    getTopBestSellerProducts: async ()=>{
        try{
            db_connection=await db.connect();
            let sql=`SELECT * FROM products where productprice::numeric>=50 and productprice::numeric<=100 order by productprice::numeric desc limit 8`;
            let result=await db.any(sql);
            return result;
        }
        catch(err){
            console.log(err);
            return [];
        }
        finally{
            db_connection.done();
        }
    },
    getTopNewArrivalProducts: async ()=>{
        try{
            db_connection=await db.connect();
            let sql=`SELECT * FROM products order by postingdate desc limit 8`;
            let result=await db.any(sql);
            return result;
        }
        catch(err){
            console.log(err);
            return [];
        }
        finally{
            db_connection.done();
        }
    },
    getTopHotSalesProducts: async ()=>{
        try{
            db_connection=await db.connect();
            let sql=`SELECT * FROM products where productprice::numeric<=80 order by productprice desc limit 4`;
            let result=await db.any(sql);
            return result;
        } 
        catch(err){
            console.log(err);
            return [];
        }
        finally{
            db_connection.done();
        }
    }
}