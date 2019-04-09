const Establishment = require("../models/Establishments").model;

let establishmentController = {};

establishmentController.getAll = (req, res) => {
    Establishment.find({}).exec((err, establishment) => {
        res.status = 302;
        var objetoRespuesta = {
            result: 302,
            data: err
        }
        if (!err) {
            res.status = 200;
            objetoRespuesta = {
                result: 200,
                data: Establishments
            }
        }
        return res.send(objetoRespuesta);
    })
}

establishmentController.find = (req, res) => {
    // Obtener el :id
    let id = req.params.id;
    Establishment.find({ _id: id }).exec((err, establishment) => {
        res.status(302);
        var objetoRespuesta = {
            result: 302,
            data: err
        }
        if (!err) {
            res.status(200);
            objetoRespuesta = {
                result: 200,
                data: Establishments
            }
        }
        return res.send(objetoRespuesta);
    })
}

establishmentController.create = (req, res) => {
    let Establishment = new Establishment(req.body);
    
    Establishment.save( err => {
        res.status(400);
        var objetoRespuesta = {
            result: false,
            codigo: 300,
            mensaje: 'Parametros requeridos incompletos',
            errores: err
        }
        if (!err) {
            res.status(200);
            objetoRespuesta = {
                result: true,
                codigo: 200,
                mensaje: 'Usuario creado'
            }
        }
        
        return res.send(objetoRespuesta);
    })
}

establishmentController.update = (req, res) => {
    Establishment.update({_id:req.body._id}, {$set: req.body}).exec((err, Establishment) => {
        if (err) {
            var objetoRespuesta = {
                result: false,
                codigo: 304,
                mensaje: 'No modificado',
                errores: err["errors"]
            }
        }else {
            objetoRespuesta = {
                result: true,
                codigo: 302,
                mensaje: 'Modificado'
            }
        }
        return res.send(objetoRespuesta);
    });
}


//mdAutenticacion.verificaToken,
establishmentController.delete = (req, res) => {
    var id = req.body._id;
    
    Establishment.findOneAndDelete(id, (err, Establishment) => {
        var objetoRespuesta = {
            result: true,
            codigo: 302,
            mensaje: 'Eliminado'
        }
        if (err) {
            objetoRespuesta = {
                result: false,
                codigo: 304,
                mensaje: 'No eliminado',
                errores: err["errors"]
            }
        }
        return res.send(objetoRespuesta);
    });
};

module.exports = establishmentController;
