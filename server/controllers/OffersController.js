const Offer = require("../models/Offers").model;

let offerController = {};

offerController.getAll = (req, res) => {
    Offer.find({}).exec((err, offer) => {
        res.status = 302;
        var objetoRespuesta = {
            result: 302,
            data: err
        }
        if (!err) {
            res.status = 200;
            objetoRespuesta = {
                result: 200,
                data: offer
            }
        }
        return res.send(objetoRespuesta);
    })
}

offerController.find = (req, res) => {
    // Obtener el :id
    let id = req.params.id;
    Offer.find({ _id: id }).exec((err, offer) => {
        res.status(302);
        var objetoRespuesta = {
            result: 302,
            data: err
        }
        if (!err) {
            res.status(200);
            objetoRespuesta = {
                result: 200,
                data: offer
            }
        }
        return res.send(objetoRespuesta);
    })
}

offerController.create = (req, res) => {
    let OfferObject = new Offer(req.body);
    
    OfferObject.save( err => {
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

offerController.update = (req, res) => {
    Offer.update({_id:req.body._id}, {$set: req.body}).exec((err, offer) => {
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
offerController.delete = (req, res) => {
    var id = req.body._id;
    
    Offer.findOneAndDelete(id, (err, offer) => {
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

module.exports = offerController;
