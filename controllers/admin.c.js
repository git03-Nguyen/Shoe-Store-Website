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
      console.log(data);
      res.json(data);
    }
  },

};


