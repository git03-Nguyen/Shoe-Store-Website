module.exports = {
    contact: (req, res, next) => {
        res.render('contact', {status: "Contact"});
    }
}