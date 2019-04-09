const Menu = require("../models/menu").model;

let menuController = {};

menuController.getAll = (req, res) => {
    Menu.find({}).exec((err, menu) => {
        res.status = 302;
        var objetoRespuesta = {
            result: 302,
            data: err
        }
        if (!err) {
            res.status = 200;
            objetoRespuesta = {
                result: 200,
                data: menu
            }
        }
        return res.send(objetoRespuesta);
    })
}

menuController.find = (req, res) => {
    // Obtener el :id
    let id = req.params.id;
    Menu.find({ _id: id }).exec((err, menu) => {
        res.status(302);
        var objetoRespuesta = {
            result: 302,
            data: err
        }
        if (!err) {
            res.status(200);
            objetoRespuesta = {
                result: 200,
                data: menu
            }
        }
        return res.send(objetoRespuesta);
    })
}

menuController.create = (req, res) => {
    let Menu = new Menu(req.body);
    
    Menu.save( err => {
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

menuController.update = (req, res) => {
    Menu.update({_id:req.body._id}, {$set: req.body}).exec((err, menu) => {
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
menuController.delete = (req, res) => {
    var id = req.body._id;
    
    Menu.findOneAndDelete(id, (err, menu) => {
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

module.exports = menuController;
