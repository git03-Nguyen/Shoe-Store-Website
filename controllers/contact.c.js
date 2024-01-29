module.exports = {
    contact: (req, res, next) => {
        res.render('contact', { user: req.user, status: "Contact", title: "Contact" });
    }
}