const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './public/img/product');
    },

    filename: function (req, file, callback) {
        const product = JSON.parse(req.body.data);
        const fileExtension = file.originalname.split('.').pop();
        const newFileName = `product_${product.id}.${fileExtension}`;

        callback(null, newFileName);
    },
});

const upload = multer({ storage: storage });

module.exports = upload;