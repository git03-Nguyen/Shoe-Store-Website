
module.exports = {

  // GET /admin
  getDashboard: (req, res, next) => {
    res.render('admin/dashboard', {
      layout: 'admin',
      title: 'Admin Dashboard',
      user: req.user,
    });
  },

  // GET /admin/products
  getProducts: async (req, res, next) => {
    try {
      let productList = await Product.getAllProducts();
      if (!productList) {
        res.status(404).send("There is no product in database !");
      }

      res.render('admin/products', { status: "Products", productList });
    } catch (error) {
      next(error);
    }
  },

};


