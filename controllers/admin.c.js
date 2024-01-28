
const Category = require('../models/category.m');
const dbCategory = require('../utils/dbCategory');

const Order = require('../models/order.m');

const User = require('../models/user.m');
const dbProduct = require('../utils/dbProduct');
const Product = require('../models/product.m');

module.exports = {

  // GET /admin
  getDashboard: async (req, res, next) => {
    res.render('admin/dashboard', {
      layout: 'admin',
      title: 'Dashboard',
      subnavigation: 0,
      user: req.user,
      revenue: await Order.getRevenue(),
      nOfOrders: await Order.countOrders(),
      nOfUsers: await User.countUsers(),
      nOfProducts: await dbProduct.countProducts(),
    });
  },


  getCategoryManagement: async (req, res, next) => {

    // Get all categories
    let categories = await Category.getAllCategories();
    // console.log(categories);
    res.render('admin/category-management', {
      layout: 'admin',
      title: 'Category Management',
      subnavigation: 3,
      user: req.user,
      categories: categories,
    });

  },

  //POST /admin/category-management/edit
  postEditCategory: async (req, res, next) => {
    const { categoryName,
      categoryDescription,
      categoryId } = req.body;
    // console.log(categoryName);

    try {
      let result = await Category.editCategory(categoryId, categoryName, categoryDescription);
      if (result) {
        res.json({ success: true, message: 'Edit category successfully!' });
      }
      else {
        res.json({ success: false, message: 'Edit category failed!' });
      }
    }
    catch (err) {
      res.json({ success: false, message: 'Edit category failed!' });
    }
  },
  //POST /admin/category-management/create
  postAddNewCategory: async (req, res, next) => {
    const { categoryName,
      categoryDescription } = req.body;
    try {
      let category = {
        categoryname: categoryName,
        categorydescription: categoryDescription
      };
      // console.log(category);
      const newCategory = new Category(category);
      // console.log(newCategory);
      let result = await Category.addNewCategory(newCategory);
      if (result) {
        res.json({ success: true, message: 'Add Category successfully!' });
      }
      else {
        res.json({ success: false, message: 'Add Category failed!' });
      }
    }
    catch (err) {
      res.json({ success: false, message: 'Add Category failed!' });
    }

  },
  //POST /admin/category-management/delete
  postDeleteCategory: async (req, res, next) => {
    const { categoryId } = req.body;
    try {

      const productCount = await dbCategory.checkCategoryHasExistProduct(categoryId);
      if (productCount > 0) {
        res.json({ success: false, message: 'Cannot delete category because it has products.' });
        return;
      }
      let result = await Category.deleteCategory(categoryId);
      if (result) {
        res.json({ success: true, message: 'Delete category successfully!' });
      }
      else {
        res.json({ success: false, message: 'Delete category failed!1' });
      }
    }
    catch (err) {
      res.json({ success: false, message: 'Delete category failed!2' });
    }
  },

  // GET /sales?mode=
  getSales: async (req, res, next) => {
    let mode = req.query.mode;

    if (mode == 'daily') {
      // response with 7 recent days: 
      const today = new Date();
      const dates = [
        new Date(today.getFullYear(), today.getMonth(), today.getDate() - 6),
        new Date(today.getFullYear(), today.getMonth(), today.getDate() - 5),
        new Date(today.getFullYear(), today.getMonth(), today.getDate() - 4),
        new Date(today.getFullYear(), today.getMonth(), today.getDate() - 3),
        new Date(today.getFullYear(), today.getMonth(), today.getDate() - 2),
        new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1),
        today,
      ];

      // dateStr = date with format "mm/dd"
      const dateStrs = dates.map(date => {
        return `${date.getDate()}/${date.getMonth() + 1}`;
      });

      let data = [];
      for (let i = 0; i < dates.length; i++) {
        const date = dates[i];
        const count = await Order.countOrdersByDate(date);
        data.push(count);
      }

      res.json({ dates: dateStrs, data });
    } else if (mode == 'monthly') {
      // response with 6 recent months: 
      const today = new Date();
      const dates = [
        new Date(today.getFullYear(), today.getMonth() - 5, 1),
        new Date(today.getFullYear(), today.getMonth() - 4, 1),
        new Date(today.getFullYear(), today.getMonth() - 3, 1),
        new Date(today.getFullYear(), today.getMonth() - 2, 1),
        new Date(today.getFullYear(), today.getMonth() - 1, 1),
        today,
      ];

      // dateStr = date with format "mm/yyyy"
      const dateStrs = dates.map(date => {
        return `${date.getMonth() + 1}/${date.getFullYear()}`;
      });

      const datesTest = dates.map(date => {
        const monthstr = date.getMonth() + 1;
        // 01
        if (monthstr < 10) {
          return `${date.getFullYear()}-0${date.getMonth() + 1}`;
        }
        return `${date.getFullYear()}-${date.getMonth() + 1}`;
      });

      let data = [];
      for (let i = 0; i < datesTest.length; i++) {
        const date = datesTest[i];
        const count = await Order.countOrdersByMonth(date);
        data.push(count);
      }

      res.json({ dates: dateStrs, data });

    }

  },

  // GET /sales/categories?from=&to=
  getSalesByCategories: async (req, res, next) => {
    let from = req.query.from;
    let to = req.query.to;

    // if from > to, return empty data
    if (from > to) {
      return res.json({ categories: [], counts: [] });
    }

    if (from && to) {
      const data = await Order.countOrdersByCategories(from, to);
      res.json(data);
    }
  },

  // GET /users
  getUserManagement: async (req, res, next) => {
    res.render('admin/user-management', {
      layout: 'admin',
      title: 'User Management',
      subnavigation: 1,
      user: req.user,
      users: await User.getAllUsers(),
    });
  },

  // POST /users/delete
  postDeleteUser: async (req, res, next) => {
    const { id } = req.body;
    console.log(id);
    try {
      let result = await User.deleteUser(id);
      if (result) {
        res.json({ success: true, message: 'Delete user successfully!' });
      }
      else {
        res.json({ success: false, message: 'Delete user failed!' });
      }
    }
    catch (err) {
      res.json({ success: false, message: 'Delete user failed!' });
    }
  },

  // POST /users/edit
  postEditUser: async (req, res, next) => {
    const { id, username, fullname, email, phonenumber, avatar, address, isadmin } = req.body;
    try {
      let result = await User.editUser(id, username, fullname, email, phonenumber, avatar, address, isadmin);
      if (result) {
        res.json({ success: true, message: 'Edit user successfully!' });
      }
      else {
        res.json({ success: false, message: 'Edit user failed!' });
      }
    }
    catch (err) {
      res.json({ success: false, message: 'Edit user failed!' });
    }
  },

  // POST /users/upload
  postUploadAvatar: async (req, res, next) => {
    const { id } = req.body;
    // avatar = the path of the avatar image after multer upload
    let avatar = req.file.path;
    // delete the prefix public
    avatar = avatar.replace('public', '');
    try {
      let result = await User.updateAvatar(id, avatar);
      if (result) {
        res.json({ success: true, message: 'Upload avatar successfully!', avatar: avatar });
      }
      else {
        res.json({ success: false, message: 'Upload avatar failed!' });
      }
    }
    catch (err) {
      res.json({ success: false, message: 'Upload avatar failed!' });
    }
  },

  // POST /users/create
  postCreateUser: async (req, res, next) => {
    try {
      let result = await User.createNewUser(req.body);
      if (result) {
        res.json({ success: true, message: 'Create user successfully!' });
      }
      else {
        res.json({ success: false, message: 'Create user failed!' });
      }
    }
    catch (err) {
      res.json({ success: false, message: 'Create user failed!' });
    }
  },

  // GET /products
  getProductManagement: async (req, res, next) => {
    const categories = await Category.getAllCategories();
    const products = await Product.getAllProducts();
    products.forEach(product => {
      product.categoryname = categories.find(category => category.id == product.categoryId).categoryName;
    });
    res.render('admin/product-management', {
      layout: 'admin',
      title: 'Product Management',
      subnavigation: 4,
      user: req.user,
      categories: categories,
      products: products,

    });
  },

  // GET /products/get
  getProducts: async (req, res, next) => {
    const { id } = req.query;
    const products = await Product.getAllProducts();
    const product = products.find(product => product.id == id);
    res.json({ success: true, data: product });
  },

  // POST /products/edit
  postEditProduct: async (req, res, next) => {
    try {
      let result = await Product.updateProduct(req.body);
      if (result) {
        res.json({ success: true, message: 'Edit product successfully!' });
      }
      else {
        res.json({ success: false, message: 'Edit product failed!' });
      }
    }
    catch (err) {
      res.json({ success: false, message: 'Edit product failed!' });
    }
  },



};


