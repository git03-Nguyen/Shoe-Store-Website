
module.exports = {
    about: (req, res, next) => {
        res.render('about', { user: req.user, status: "About Us" });
    }
}