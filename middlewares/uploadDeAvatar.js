const multer = require('multer');

const storage = multer.diskStorage(
    { 
    destination: 'public/img/avatares/',
    filename: function(req, file, callback){
        let novoNome = `$${Math.random()*1E15}-${file.originalname}`;
        callback(null, novoNome);
    }
    }
);

const upload = multer({storage});

module.exports = upload.single('foto');