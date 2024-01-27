const Category = require('../models/category.m');


module.exports = {

  // GET /admin
  getDashboard: (req, res, next) => {
    res.render('admin/dashboard', {
      layout: 'admin',
      title: 'Admin Dashboard',
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
      categoryId} = req.body;
    // console.log(categoryName);

   try{
    let result=await Category.editCategory(categoryId, categoryName, categoryDescription);
    if (result)
    {
      res.json({success: true, message: 'Edit category successfully'});
    }
    else {
      res.json({success: false, message: 'Edit category failed'});
    }
  }
  catch(err){
    res.json({success: false, message: 'Edit category failed'});
  }
}

};


