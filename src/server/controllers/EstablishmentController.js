const Establishment = require("../models/Establishment").model;
const Tools = require("../util/Tools");
const path = require("path");
var fs = require("fs");
var mkdirp = require('mkdirp');



let establishmentController = {};

establishmentController.getAll = (req, res) => {

    Establishment.find({}).exec((err, establishment) => {
        let response = Tools.response.get(err, establishment);
        return res.status(response.status).json(response);
    })
}

establishmentController.find = (req, res) => {
    // Obtener el :id
    let id = req.params.id;
    Establishment.find({ _id: id }).exec((err, establishment) => {
        let response = Tools.response.get(err, establishment);
        return res.status(response.status).json(response);
    })
}


establishmentController.create = (req, res) => {
    let establishment = new Establishment(req.body);

    establishment.save(err => {
        let response = Tools.response.get(err, establishment);
        console.log(response);
        if (response.error == false) {
            console.log("he entrado");
            
            //PARA COGER EL HOST
            // var saveUrl = req.protocol + '://' + req.get('host')+"/public/stablishment/";
            var directorio = path.resolve(__dirname, "../..");
            var carpeta =  "/public/src/stablishments/";
            Tools.createDir(directorio,carpeta,response.response._id);         
        }
        if (response.error == false) {
            Tools.createDir(path);
        }

        return res.status(response.status).json(response);
    })
}

establishmentController.update = (req, res) => {
    Establishment.update({ _id: req.body._id }, { $set: req.body }).exec((err, establishment) => {
        let response = Tools.response.get(err, establishment);
        if (response.status === 200) {
            req.params.id = req.body._id;
            return establishmentController.find(req, res);
        } else {
            return res.status(response.status).json(response);
        }
    });
}

//mdAutenticacion.verificaToken,
establishmentController.delete = (req, res) => {
    var id = req.body._id;
    Establishment.findOneAndDelete(id, (err, establishment) => {
        let status = err ? 500 : !establishment ? 400 : 200;
        let response = err ? err : establishment ? establishment : { message: `No existe el establecimiento con el id: ${id}` };

        return res.status(status).json({
            status,
            result: status === 200 ? true : false,
            response
        })
    });
};

module.exports = establishmentController;