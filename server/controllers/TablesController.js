const Table = require("../models/Tables").model;
const Tools = require("../util/Tools");

let tableController = {};


tableController.getAll = (req, res) => {
    Table.find({}).exec((err, tables) => {
        let response = Tools.response.get(err, tables);
        return res.status(response.status).json(response);
    })
}



tableController.find = (req, res) => {
    let uuid = req.params.id;
    Table.find({ uuid: uuid }).exec((err, tables) => {
        res.status(302);
        var objetoRespuesta = {
            result: 302,
            data: err
        }
        if (!err) {
            res.status(200);
            objetoRespuesta = {
                result: 200,
                data: tables
            }
        }
        return res.send(objetoRespuesta);
    })
}



tableController.create = (req, res) => {
    let table = new Table(req.body);
    
    table.save( err => {
        res.status(400);
        var objetoRespuesta = {
            result: false,
            codigo: 300,
            mensaje: 'Parametros requeridos incompletos',
            errores: err["errors"]
        }
        if (!err) {
            res.status(200);
            objetoRespuesta = {
                result: true,
                codigo: 200,
                mensaje: 'Mesa insertada correctamente'
            }
        }
        
        return res.send(objetoRespuesta);
    })
}


tableController.update = (req, res) => {
    console.log(req.body);
    Table.update({_id:req.body._id}, {$set: req.body}).exec((err, user) => {
        if (err) {
            console.log("ERROR",err);
        }
        console.log("BIEN",user);
    });
}

                                
                            //mdAutenticacion.verificaToken,

tableController.delete = (req, res) => {

    var id = req.params.id;

    Table.findByIdAndRemove(id, (err, TableDelete) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error borrar tabla(mesa)',
                errors: err
            });
        }

        if (!TableDelete) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe una mesa  con ese id',
                errors: { message: 'No existe un mesa con ese id' }
            });
        }

        res.status(200).json({
            ok: true,
            table: TableDelete
        });

    });

};



module.exports = tableController;