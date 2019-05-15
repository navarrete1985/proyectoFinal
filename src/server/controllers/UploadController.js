let uploadController = {};

uploadController.upload = (req, resp) => {
    let response = false;
    if (req.file) {
        console.warn('Archivos subidos satisfactoriamente');
        console.warn(req.file);
        console.warn(req);
        console.warn(req.uploadFiles);
        response = true;
    }else {
        console.error('Se ha producido un error al subir los archivos!');
    }
    return resp.status(200).json({response});
}

module.exports = uploadController;