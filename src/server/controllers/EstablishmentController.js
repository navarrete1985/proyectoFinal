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

establishmentController.getStablishmentPagination = (req, res) => {
    console.log("server");
    console.log(req);
    const options = {
        page: req.body.page || 4,
        limit: req.body.limit || 10,
        // customLabels: myCustomLabels
    };
    Establishment.paginate({}, options, (err, result) => {
        return res.status(!err ? 200 : 400).json(result);
    });
}
establishmentController.find = (req, res) => {
    // Obtener el :id
    let id = req.params.id;
    Establishment.find({ _id: id }).exec((err, establishment) => {
        let response = Tools.response.get(err, establishment);
        return res.status(response.status).json(response);
    })
}

establishmentController.arrayFind = (req, res) => {
    let ids = req.body.ids;
    console.log('Cuerpo de la petición --> '. req);
    if (!ids || !Array.isArray(ids)) {
        return res.status(400).json({result: 'error', response: 'Solicitud mal formulada, se necesita un array de ids de establecimientos'});
    }
    Establishment.find({_id: {$in: ids}}).exec((err, establishments) => {
        let status = err ? 404 : 200;
        let error = err ? true : false;
        let response = err ? 'No se han encontrado los establecimientos en la base de datos' : establishments;
        return res.status(status).json({error, response, status});
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
    console.log("api"+req);
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

/*
[
"5cae1cc2066265087ae606a7",
"5cdb2f9bd432f241402447c1",
"5cdc55161d433c2b604ef2f1",
"5cdc598213cdca163cd98f49",
"5cdc5ad6ec487a2870485aca",
"5cdc5cfe0654421d20f074a6",
"5cdc5d0d0654421d20f074a7"
]

*/