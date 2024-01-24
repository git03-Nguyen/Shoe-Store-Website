const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './public/img/avatars');
    },

    filename: function (req, file, callback) {
        const fileExtension = file.originalname.split('.').pop();
        const newFileName = `avatar_${req.user.id}.${fileExtension}`;
        
        callback(null, newFileName);
    },
});

const upload = multer({ storage: storage });

module.exports = upload;