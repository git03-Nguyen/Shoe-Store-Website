module.exports = function (app) {
  // "/test"
  app.get('/test', (req, res) =>{
    res.render('shop/shop');
  });

  // "/"
  app.use('/', require('./home.r'));

  // "/shop" "/shop-cart" "/shop-favorite" "shop-detail" "shop-checkout"
  app.use('/shop', require('./shop.r'));

  // "/about"
  app.use("/about", require("./about.r"));

  // "/contact"
  app.use("/contact", require("./contact.r"));
}