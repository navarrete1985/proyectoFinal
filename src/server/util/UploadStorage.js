const md5File = require('md5-file');
const multer = require('multer');
const path = require('path');

var storage = multer.diskStorage({
    destination: function(req,file,cb){
        let type = req.body.type || 'default';
        cb(null, `../../public/uploads/${type}`);
    },
    filename:function(req,file,cb){
        if (requ.uploadFiles === undefined) req.uploadFiles = [];
        let user_id = req.body.user_id;
        let hash = md5File.sync(file);
        let filename = user_id + hash + path.extname(file.originalname);
        cb(null, filename); //Appending extension
        req.uploadFiles.push(filename);
    }
});

var upload = multer({ storage: storage,
    fileFilter: function (req, file, cb) {
        if (!file.originalname.match(/\.(jpg|png)$/)) {
            return cb(new Error('Error en el tipo de archivo.'));
        }
        cb(null, true);
    }
});

// export {upload};
// export default upload;

module.exports = upload;

// /* Async usage */
// md5File('LICENSE.md', (err, hash) => {
//     if (err) throw err
//
//     console.log(`The MD5 sum of LICENSE.md is: ${hash}`)
// })
//
// /* Sync usage */
// const hash = md5File.sync('LICENSE.md')
// console.log(`The MD5 sum of LICENSE.md is: ${hash}`)