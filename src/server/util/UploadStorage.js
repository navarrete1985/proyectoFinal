const multer = require('multer');
const path = require('path');
const fs = require('fs');
const base = path.resolve('src/public/src');

// Array.prototype.diff = function(a) {
//     return this.filter(function(i) {return a.indexOf(i) < 0;});
// };

//Comprobación de si la ruta de destino está formada, en caso de que no exista un directorio lo creamos.
const checkPath = (route) => {
    let uri = base;
    route.split('/').forEach(route => {
        uri = path.join(uri, route);
        if (!fs.existsSync(uri)) {
            fs.mkdirSync(uri);
        }
    });
    return uri + '/';
}

var storage = multer.diskStorage({
    destination: function(req,file,cb){
        console.log('Vamos a definir la ruta de destino');
        let uri = checkPath(req.paramsType.route); 
        console.log('Destino --> ', uri);
        cb(null, uri);
    },
    filename: function(req,file,cb){
        console.log('Vamos a nombrar el archivo');
        let filename = req.paramsType.name !== undefined ? req.paramsType.name + path.extname(file.originalname) : file.originalname;
        req.uploadFiles[file.originalname].filename = filename;
        // req.paramsType.name = filename;
        console.log('Nombre del archivo --> ', filename);
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
            console.log('Entro por allí');
            cb(null, true);
        }
    }
});


module.exports = upload;