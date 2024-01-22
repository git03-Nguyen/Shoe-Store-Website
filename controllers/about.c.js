
module.exports = {
    about: (req, res, next) => {
        res.render('about', {status: "About Us"});
    }
}