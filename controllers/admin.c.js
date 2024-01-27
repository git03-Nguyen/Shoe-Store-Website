
const Category = require('../models/category.m');
const dbCategory = require('../utils/dbCategory');

const Order = require('../models/order.m');

module.exports = {

  // GET /admin
  getDashboard: (req, res, next) => {
    res.render('admin/dashboard', {
      layout: 'admin',
      title: 'Dashboard',
      user: req.user,
    });
  },


  getCategoryManagement: async (req, res, next) => {

    // Get all categories
    let categories = await Category.getAllCategories();
    // console.log(categories);
    res.render('admin/category-management', {
      layout: 'admin',
      title: 'Category Management',
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
    }
  },

  // GET /sales/categories?from=&to=
  getSalesByCategories: async (req, res, next) => {
    let from = req.query.from;
    let to = req.query.to;

    if (from && to) {
      const data = await Order.countOrdersByCategories(from, to);
      res.json(data);
    }
  },

};


