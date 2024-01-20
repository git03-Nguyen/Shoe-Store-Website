exports.home=async (req,res)=>{
    try{
         
            //  let resultTopRating=await getTop05RatingMovies();
             res.render('home',
            //  {   results:resultTopRating}
            );
            
        
    }
    catch(err){
         console.log(err);
         res.status(500).send('Error while query top rating');
    }
};