

module.exports = {

  checkAdmin: async function (req, res, next) {
    if (req.isAuthenticated() && req.user.isadmin) {
      return next();
    }

    res.redirect('/user/login');
  },
};