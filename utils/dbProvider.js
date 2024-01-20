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
    getTop08Products: async ()=>{
        try{
            db_connection=await db.connect();
            let sql=`SELECT * FROM products LIMIT 8`;
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