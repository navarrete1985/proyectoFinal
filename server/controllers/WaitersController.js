const Waiter = require("../models/Waiters").model;

let waiterController = {};

waiterController.getAll = (req, res) => {
    Waiter.find({}).exec((err, waiters) => {
        res.status = 302;
        var objetoRespuesta = {
            result: 302,
            data: err
        }
        if (!err) {
            res.status = 200;
            objetoRespuesta = {
                result: 200,
                data: waiters
            }
        }
        return res.send(objetoRespuesta);
    })
}

waiterController.find = (req, res) => {
    // Obtener el :id
    let id = req.params.id;
    Waiter.find({ _id: id }).exec((err, waiters) => {
        res.status(302);
        var objetoRespuesta = {
            result: 302,
            data: err
        }
        if (!err) {
            res.status(200);
            objetoRespuesta = {
                result: 200,
                data: waiters
            }
        }
        return res.send(objetoRespuesta);
    })
}

waiterController.create = (req, res) => {
    let waiter = new Waiter(req.body);
    
    waiter.save( err => {
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

waiterController.update = (req, res) => {
    Waiter.update({_id:req.body._id}, {$set: req.body}).exec((err, waiter) => {
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
waiterController.delete = (req, res) => {
    var id = req.body._id;
    
    Waiter.findOneAndDelete(id, (err, waiter) => {
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

module.exports = waiterController;
