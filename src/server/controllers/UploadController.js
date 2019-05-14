let uploadController = {};

uploadController.upload = (req, resp) => {

    if (req.file) {
        console.warn('Archivos subidos satisfactoriamente');
        console.warn(req.file);
        console.warn(req);
        console.warn(req.uploadFiles);
    }else {
        console.error('Se ha producido un error al subir los archivos!');
    }

}

module.exports = uploadController;