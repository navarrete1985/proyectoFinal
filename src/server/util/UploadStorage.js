const md5File = require('md5-file');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const base = path.resolve('src/public/src/upload');

var storage = multer.diskStorage({
    destination: function(req,file,cb){
        console.log('Vamos a definir la ruta de destino');
        let type = req.body.type || 'default';
        let dest = path.join(base, type);
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest);
        }
        cb(null, `${base}/${type}/`);
    },
    filename:function(req,file,cb){
        console.log('Vamos a nombrear el archivo');
        if (req.uploadFiles === undefined) req.uploadFiles = [];
        let user_id = req.body.user_id;
        let filename = file.originalname;
        cb(null, filename);
        req.uploadFiles.push(filename);
    }
});

var upload = multer({ storage: storage,
    fileFilter: function (req, file, cb) {
        console.log('Vamos a realizar el filtrado de archivo');
        if (!file.originalname.match(/\.(jpg|png)$/)) {
            return cb(new Error('Error en el tipo de archivo.'));
        }
        cb(null, true);
    }
});

module.exports = upload;