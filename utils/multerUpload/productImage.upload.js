const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        req.body.productImage = '/img/product/' + `product_${file.originalname}`;
        callback(null, './public/img/product');
    },

    filename: function (req, file, callback) {
        const fileExtension = file.originalname.split('.').pop();
        const newFileName = `product_${file.originalname}`;

        callback(null, newFileName);
    },
});

const upload = multer({ storage: storage });

module.exports = upload;