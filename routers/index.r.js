module.exports = function (app) {
  // Purpose: Test
  app.get('/', (req, res) => {
    res.render('shop/shop-detail');
  })
}