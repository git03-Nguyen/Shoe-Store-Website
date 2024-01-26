
module.exports = {

  // GET /admin
  getDashboard: (req, res, next) => {
    res.render('admin/dashboard', {
      layout: 'admin',
      title: 'Admin Dashboard',
      user: req.user,
    });
  },

};


