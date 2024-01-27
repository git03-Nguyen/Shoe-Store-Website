const { checkAdmin } = require('../utils/admin');


module.exports = function (app) {
  // "/"
  app.use('/', require('./home.r'));

  // "/user/login" "/user/signup" "/user/logout"
  app.use('/user', require('./user.r'));

  // "/auth/google" "/auth/google/callback"
  app.use('/auth', require('./auth.r'));

  // "/profile"
  app.use('/profile', require('./profile.r'));


  // "/shop" "/shop-cart" "/shop-favorite" "shop-detail" "shop-checkout"
  app.use('/shop', require('./shop.r'));

  // "/about"
  app.use("/about", require("./about.r"));

  // "/contact"
  app.use("/contact", require("./contact.r"));


  // "/admin"
  app.use("/admin", checkAdmin, require("./admin.r"));


}