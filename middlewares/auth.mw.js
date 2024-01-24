module.exports = {
    checkAuthenticatedForAddToCart: async (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        }

        console.log('middleware')
        let data = new Object();
        data.message = 'Please login to add!';
        res.json(data);
    },
}