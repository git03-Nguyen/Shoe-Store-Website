

module.exports = {

  checkAdmin: async function (req, res, next) {
    if (req.isAuthenticated() && req.user.isadmin) {
      return next();
    }

    res.redirect('/user/login');
  },

  isAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }

    res.redirect('/user/login');
  },

  isNotAuthenticated: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }

    res.redirect('/');
  },

};