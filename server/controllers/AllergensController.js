const Allergen = require("../models/Allergens").model;

let allergenController = {};

allergenController.getAll = (req, res) => {
    Allergen.find({}).exec((err, allergen) => {
        res.status = 302;
        var objetoRespuesta = {
            result: 302,
            data: err
        }
        if (!err) {
            res.status = 200;
            objetoRespuesta = {
                result: 200,
                data: allergen
            }
        }
        return res.send(objetoRespuesta);
    })
}

allergenController.find = (req, res) => {
    // Obtener el :id
    let id = req.params.id;
    Allergen.find({ _id: id }).exec((err, allergen) => {
        res.status(302);
        var objetoRespuesta = {
            result: 302,
            data: err
        }
        if (!err) {
            res.status(200);
            objetoRespuesta = {
                result: 200,
                data: allergen
            }
        }
        return res.send(objetoRespuesta);
    })
}

allergenController.create = (req, res) => {
    let AllergenObject = new Allergen(req.body);
    
    AllergenObject.save( err => {
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

allergenController.update = (req, res) => {
    Allergen.update({_id:req.body._id}, {$set: req.body}).exec((err, Allergen) => {
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
allergenController.delete = (req, res) => {
    var id = req.body._id;
    
    Allergen.findOneAndDelete(id, (err, Allergen) => {
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

module.exports = allergenController;
