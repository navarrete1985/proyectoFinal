const multer = require('multer');
const path = require('path');
const fs = require('fs');
const base = path.resolve('src/public/src/upload');

var storage = multer.diskStorage({
    destination: function(req,file,cb){
        console.log('Vamos a definir la ruta de destino');
        let type = 'default';
        if (req.body.extraParams && req.body.extraParams.type) type = req.body.extraParams.type;
        let dest = path.join(base, type);
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest);
        }
        cb(null, `${base}/${type}/`);
    },
    filename: function(req,file,cb){
        console.log('Vamos a nombrar el archivo');
        let user_id = req.body.user_id;
        let filename = file.originalname;
        cb(null, filename);
    }
});

var upload = multer({ storage: storage,
    fileFilter: function (req, file, cb) {
        console.log('Vamos a realizar el filtrado de archivo');
        let filename = file.originalname;
        if (req.uploadFiles === undefined) req.uploadFiles = {};
        req.uploadFiles[filename] = {};
        if (!file.originalname.match(/\.(jpg|jpge|png|gif)$/)) {
            req.uploadFiles[filename].complete = false;
            req.uploadFiles[filename].error = 'Error en el tipo de archivo';
            cb(null, false);
        }else {
            req.uploadFiles[filename].complete = true;
            req.uploadFiles[filename].filename = filename;
            console.log('Entro por allí');
            cb(null, true);
        }
    }
});

module.exports = upload;