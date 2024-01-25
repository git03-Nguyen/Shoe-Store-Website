module.exports = {
    checkAuthenticatedForAddToCart: async (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        }

        let data = new Object();
        data.message = 'Please login to add!';
        return res.json(data);
    },

    checkAuthenticatedForRemoveCart: async (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        }

        let data = new Object();
        data.message = 'Please login to remove!';
        return res.json(data);
    },

    checkAuthenticatedForUpdateCart: async (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        }

        let data = new Object();
        data.message = 'Please login to update!';
        return res.json(data);
    },

    checkAuthenticatedForOrder: async (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        }

        let data = new Object();
        data.message = 'Please login to place order!';
        return res.json(data);
    },

    checkAuthenticatedRedirectLogin: async (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        }

        return res.redirect('/user/login');
    },
}