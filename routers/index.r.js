module.exports = function (app) {
  // "/"
  app.use('/', require('./home.r'));

  // "/shop" "/shop-cart" "/shop-favorite" "shop-detail" "shop-checkout"
  app.use('/shop', require('./shop.r'));

  // "/about"
  app.use("/about", require("./about.r"));

  // "/contact"
  app.use("/contact", require("./contact.r"));
}